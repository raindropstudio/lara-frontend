<template>
  <div class="container mx-auto flex max-w-screen-xl items-center p-4">
    <div>
      <NuxtLink to="/">
        <img
          class="h-10 hover:drop-shadow-lg"
          src="~/assets/spirit/sun_spirit_left_square.png"
          alt="lara logo"
        />
      </NuxtLink>
    </div>
    <div class="flex grow">
      <div class="mx-3">
        <button
          type="button"
          class="flex w-48 rounded-md border-2 border-sunny-orange p-1 text-xs font-medium caret-sunny-orange focus:outline-none focus:ring-1 focus:ring-sunny-orange"
        >
        <!--TODO: 버튼으로 변경-->
          캐릭터 검색하기
        </button>
      </div>
      <div class="flex items-end gap-4 text-lucid-violet">
        <NuxtLink v-for="nav in navMenu" :key="nav.id" :to="nav.path">
          <div
            class="hover:font-bold"
            :class="{
              'font-bold text-sunny-orange underline underline-offset-4':
                $route.path === nav.path,
            }"
          >
            {{ nav.name }}
          </div>
        </NuxtLink>
      </div>
    </div>
    <div
      class="h-8 w-8 rounded-full border-[2.5px] border-solid border-lucid-violet"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: () => {
    return {
      navMenu: [
        { name: "메인", path: "/main" },
        { name: "기록", path: "/record" },
        { name: "스탯", path: "/stat" },
        { name: "스킬", path: "/skill" },
        { name: "장비", path: "/equip" },
        { name: "인벤토리", path: "/inventory" },
        { name: "코디", path: "/coordi" },
        { name: "유니온", path: "/union" },
        { name: "라이벌", path: "/rival" },
        { name: "다이어리", path: "/diary" },
        { name: "유틸리티", path: "/utility" },
      ],
    };
  },
};
</script>
