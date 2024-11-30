const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "Business/", name: 'business', component: () => import("pages/SectionPage.vue") },
      { path: "Tennis/", name: 'tennis', component: () => import("pages/SectionPage.vue")},
      { path: "Gym/", name: 'gym', component: () => import("pages/SectionPage.vue") },
      { path: "Trips/", name: 'trips', component: () => import("pages/SectionPage.vue")}
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
