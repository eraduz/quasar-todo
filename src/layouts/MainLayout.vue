<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">{{todaysDate}}</div>
      </div>
      <q-img src="statics/images/banner.jpg" class="header-image absolute-top" />
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above :width="250" :breakpoint="600">
      <q-scroll-area
        style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item to="/" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section>To do</q-item-section>
          </q-item>

          <q-item to="/help" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>Help</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="../statics/images/banner.jpg" style="height: 192px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="`${ avatar }`" />
          </q-avatar>
          <div class="text-weight-bold">{{ name }}</div>
          <div>@{{ username }}</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
// import Sidebar from "components/Sidebar";
import { date } from "quasar";
import API from "../services/Api";

export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      avatar: "",
      name: "",
      username: ""
    };
  },
  computed: {
    todaysDate: () => {
      let timestamp = Date.now();
      return date.formatDate(timestamp, "dddd D MMMM YYYY");
    }
  },
  mounted() {
    API.get("users/eraduz")
      .then(res => {
        this.avatar = res.data.avatar_url;
        this.name = res.data.name;
        this.username = res.data.login;
      })
      .catch(err => console.log(err));
  }
};
</script>
<style lang="scss" scoped>
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.1;
}
</style>