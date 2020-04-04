<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        filled
        bg-color="white"
        class="col"
        square
        v-model="newTask"
        placeholder="Add task"
        dense
        @keyup.enter="addTask"
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <q-list separator bordered>
      <q-item
        v-ripple
        class="bg-white"
        v-for="task in tasks"
        :key="task.id"
        @click="task.done = !task.done"
        :class="{ 'done bg-blue-1' : task.done }"
        clickable
      >
        <q-item-section avatar>
          <q-checkbox v-model="task.done" color="blue" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-btn
          v-if="task.done"
          @click.stop="deleteTask(task.id)"
          flat
          round
          dense
          color="primary"
          icon="delete"
        />
      </q-item>
    </q-list>
    <div v-if="!tasks.length" class="absolute-center">
      <h5>No tasks</h5>
    </div>
  </q-page>
</template>

<script>
import db from "../components/firebaseInit";
export default {
  data() {
    return {
      tasks: [],
      newTask: "",
      id: "",
      done: false
    };
  },
  methods: {
    deleteTask(value) {
      console.log(value)
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          db.collection("todos")
            .where("id", "==", value)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.delete();
                this.$q.notify("Succesfully removed");
                this.tasks.splice(this.tasks.id, 1);
              });
            });
        });
    },
    addTask() {
      db.collection("todos")
        .add({
          "id": ++this.id,  
          "task": this.newTask,
          "done": this.done
        })
        .then(
          this.tasks.push({
            id: this.id,
            title: this.newTask,
            done: this.done
          })
        );
      this.newTask = "";
    }
  },
  created() {
    db.collection("todos")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            "id": doc.data().id,
            "title": doc.data().task,
            "done": doc.data().done
          };
          this.tasks.push(data);
        });
      });
  }
};
</script>
<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
</style>
