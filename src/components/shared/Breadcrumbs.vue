<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center -space-x-1">
      <li v-for="(item, index) in crumbs" :key="index">
        <div class="flex items-center">
          <router-link :to="item.route"
            class="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700  cursor-pointer">
            {{ item.name }}
          </router-link>
          <svg v-if="index != crumbs.length - 1" class="h-5 w-auto text-gray-400" fill="currentColor"
            viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"></path>
          </svg>

        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
interface RouteSlice {
  name: string,
  route: object,
}
const route = useRoute();
const crumbs = computed(() => {
  let paths = route.fullPath.split('/');
  let routes: Array<RouteSlice> = [{ name: '🎪', route: { path: '/' } }];
  for (let i = 1; i < paths.length; i++) {
    if (!paths[i]) continue;
    let r = {
      path: paths.slice(0, i + 1).join('/'),
    };
    const ok = Object.keys(route.params);
    if (!!ok.length) {
      routes.push({
        name: `${paths[i]}s`,
        route: {
          path: `${r.path}s`
        },
      });
      for (const key of ok) {
        r.path += `/${route.params[key]}`;
      }
      routes.push({
        name: paths[i + 1],
        route: r
      });
      console.log(routes);
      return routes;

    } else {
      routes.push({
        name: paths[i],
        route: r,
      });
    }

  }
  return routes;
})

</script>