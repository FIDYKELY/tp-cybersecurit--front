import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import { createPinia } from 'pinia';
import axios from 'axios';

// styles
// import permissionMiddleware from './permissionMiddleware';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import CardUnauthorized from "@/components/Templates/Cards/CardUnauthorized.vue";
import Tables from "@/views/admin/Tables.vue";
import ProductManagement from '@/components/Templates/ProductManagement.vue';
import DriverList from '@/components/Templates/DriverList.vue';
import DriverModal from '@/components/Templates/DriverModal.vue';


import ProductModal from '@/components/Templates/ProductModal.vue';
import EditProduct from '@/components/Templates/EditProductModal.vue';

import Polls from "@/views/admin/vote/Polls.vue";
import Users from "@/views/admin/utilisateurs/Users.vue";
import Admins from "@/views/admin/utilisateurs/Admins.vue";
import Surveys from "@/views/admin/sondage/Surveys.vue";
import Maps from "@/views/admin/Maps.vue";
import ModifUser from "@/views/admin/Modif_users.vue";
import Pubs from "@/views/admin/Pubs.vue";
import Stat_Users from "@/views/admin/utilisateurs/Statistique.vue";
import Stat_Survey from "@/views/admin/sondage/Statistique.vue";
import Stat_Poll from "@/views/admin/vote/Statistique.vue";
import Stat_Publication from "@/views/admin/utilisateurs/StatPubs.vue";
import Moderation from "@/views/admin/publications/Moderation.vue";
import Recent from "@/views/admin/publications/Recent.vue";
import Report from "@/views/admin/reports/Report.vue";
import Analyse_Demographique from "@/views/admin/utilisateurs/Analyse_Demographique.vue";
import Roles from '@/views/admin/Roles.vue';
import Permissions from '@/views/admin/Permissions.vue';
import CardPermissionModif from '@/components/Templates/Cards/CardPermissionModif.vue';

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

//views without layouts

import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
// import Index from "@/views/Index.vue";

// services
import ApiService from "@/services/ApiService";

import { useAuthStore } from "./store/auth-store";

// routes

const routes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
        name: 'Dashboard',
        meta: { permission: 'perm-users' },

      },
      {
        path: "/admin/UnauthorizedAcess",
        component: CardUnauthorized,
        name: 'Unauthorized',
        meta: { permission: 'perm-unautorized' },

      },
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: '/admin/user/:id', // Spécifiez le paramètre id dans le chemin
        name: 'modifUser', // Nommez la route
        component: ModifUser,
        meta: { permission: 'perm-rolePermission' },
        props: true
      },
      {
        path: '/admin/publication', // Spécifiez le paramètre id dans le chemin
        name: 'pubs', // Nommez la route
        component: Pubs,
        meta: { permission: 'perm-publicationListe' },
        props: true
      },
      {
        path: "/admin/usersAdmins",
        name: 'ListeAdmin',
        component: Admins,
        meta: { permission: 'perm-usersAdmin' },

      },
      {
        path: "/admin/users",
        name: 'Liste',
        component: Users,
        meta: { permission: 'perm-users' },

      },
      {
        path: "/admin/products",
        name: 'ProductManagement',
        component: ProductManagement,
        meta: { permission: 'perm-products' },

      },
      {
        path: "/admin/driver",
        name: 'DriverList',
        component: DriverList,
        meta: { permission: 'perm-driver' },

      },
      {
        path: "/admin/EditDriver/edit/:id",
        name: 'EditDriver',
        component: DriverModal,
        meta: { permission: 'perm-driver' },

      },
      {
        path: "/admin/EditDriver/add",
        name: 'AddDriver',
        component: DriverModal,
        meta: { permission: 'perm-driver' },

      },
      {
        path: '/admin/products/add',
        name: 'AddProduct',
        component: ProductModal,
        meta: { permission: 'perm-productModalAdd' },
      },
      {
        path: '/admin/products/edit/:id',
        name: 'EditProduct',
        component: EditProduct,
        meta: { permission: 'perm-productModalEdit' },
        props: true,
      },
      {
        path: "/admin/vote/polls",
        component: Polls,
        meta: { permission: 'perm-votes' },
      },
      {
        path: "/admin/sondage/surveys",
        component: Surveys,
        meta: { permission: 'perm-sondages' },
      },
      {
        path: '/admin/statUser',
        component: Stat_Users,
        meta: { permission: 'perm-utilisateurStat' },
      },
      {
        path: '/admin/statPoll',
        component: Stat_Poll,
        meta: { permission: 'perm-voteStat' },
      },
      {
        path: '/admin/statSurvey',
        component: Stat_Survey,
        meta: { permission: 'perm-sondageStat' },
      },
      {
        path: '/admin/statPub',
        component: Stat_Publication,
        meta: { permission: 'perm-publicationStat' },
      },
      {
        path: '/admin/reports/:id',
        name: 'adminReports',
        component: Report,
        props: true
      },
      {
        path: "/admin/maps",
        component: Maps,
        meta: { permission: 'perm-users' },
      },
      {
        path: '/admin/roles',
        name: 'AdminRoles',
        component: Roles,
        meta: { permission: 'perm-rolePermission' } // <<<<--->>>>
      },
      {
        path: '/admin/permissions',
        component: Permissions,
        meta: { permission: 'perm-rolePermission' }
      },
      { path: '/admin/moderation', 
        component: Moderation,
        meta: { permission: 'perm-moderationPublication' },
      },
      { path: '/admin/recent', 
        component: Recent,
        meta: { permission: 'perm-publicationRecentes' },
      },
      {
        path: '/admin/analyseDemographique',
        component: Analyse_Demographique,
        meta: { permission: 'perm-analyseDemographique' },
      },
      {
        path: '/admin/roles/:roleId',
        name: 'EditRolePermissions',
        component: CardPermissionModif,
        meta: { permission: 'perm-rolePermission' },
        props: true
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        name: 'login',
        component: Login,

      },
      {
        path: "/auth/register",
        component: Register,
      },
    ],
  },
  {
    path: "/landing",
    component: Landing,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/tables",
        component: Tables,
      },
      {
        path: "/admin/maps",
        component: Maps,
      },
    ],
  },
  // { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes, 
 });
 
 router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
 
  if (to.name !== 'login' && !auth.getUser) {
     if (from.name !== 'login') {
       next({ name: 'login' });
     } else {
       next();
     }
  } else if (to.name !== 'login' && auth.getUser) {
     axios.defaults.headers.common['Authorization'] = `Bearer ${auth.getUser.token}`;
 
     try {
       const response = await axios.get(`/api/permissions/role/${auth.getUser.role_id}`);
       const rolePermissions = response.data;
       auth.user.permissions = rolePermissions;
       localStorage.setItem('user', JSON.stringify(auth.user));
 
       if (to.meta && (to.meta.permission !== null || to.meta.permission !== undefined)) {
         const userPermissions = auth.getUserPermissions;
         if (userPermissions.find((permission) => permission.name === to.meta.permission)) {
           next();
         } else {
           next({ name: 'Unauthorized' });
         }
       } else {
         next();
       }
     } catch (error) {
       console.error('Erreur lors de la récupération des permissions:', error);
       next({ name: 'Unauthorized' });
     }
  } else {
     next();
  }
 });
 
 export default router;

const app = createApp(App);

ApiService.init(app);
app.use(createPinia());
app.use(router);
app.mount("#app");
