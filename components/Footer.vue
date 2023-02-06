<template>
  <div
    class="container mx-auto flex h-24 max-w-screen-2xl flex-wrap overflow-y-hidden font-medium"
  >
    <img
      class="-mt-4 h-[130px] flex-none max-lg:hidden lg:order-1"
      src="~/assets/spirit/land_spirit.png"
    />
    <img
      class="-ml-10 h-[105px] flex-none max-lg:hidden lg:order-2"
      src="~/assets/spirit/river_spirit.png"
    />
    <img
      class="z-[1] order-4 -mr-10 h-[115px] flex-none max-lg:hidden"
      src="~/assets/spirit/sun_spirit_left.png"
    />
    <img
      class="order-5 mt-2 h-[105px] flex-none max-lg:hidden"
      src="~/assets/spirit/cloud_spirit_left.png"
    />
    <div
      class="z-[2] order-3 flex flex-grow flex-col items-center text-base font-medium"
    >
      <p>FAQ | Status | Changelog | GitHub | Contact Us</p>
      <p>오늘은 소주에보드카님이 슈가와 처음 만난 날이에요.</p>
      <p class="text-xs">
        © 2023
        <a
          class="inline-block align-[-2.5px]"
          href="https://raindrop.studio"
          target="_blank"
        >
          <img
            class="h-3"
            src="~/assets/logo/raindrop_logo.svg"
            alt="Raindrop Studio"
          />
        </a>
        All right reserved.
        <span class="text-sunny-orange">lara.moe</span>
        is not associated with NEXON Korea.
      </p>
      <div class="text-xs">
        <a
          :href="`https://github.com/raindropstudio/lara-frontend/commit/${commitHash}`"
        >
          {{ commitHash }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
const commitHash = import.meta.env.VITE_LARA_COMMIT_HASH || "unknown";
export default {
  name: "Footer",
  data() {
    return {
      commitHash,
    };
  },
};
</script>
