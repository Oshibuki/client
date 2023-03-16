<template>
    <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="currentSlide">
        <Slide class="carousel-inner" v-for="map, in maps" :key="map.id">
            <div class="carousel__item">
                <img class="d-block w-100" :src="getImage(map.url)" :alt="map.id" />
                <div class="carousel-caption" style="display: block">
                    <h2 style="text-shadow: 0px 0px 4px #000000;"><b>{{ map.id }}</b></h2>
                </div>
            </div>
        </Slide>

        <template #addons>
            <Navigation />
        </template>
    </Carousel>
</template>
  
<script>
import { Carousel, Slide, Navigation } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default {
    data: () => {
        return {
            maps: [
                { id: 'Verloren', url: '../../assets/img/maps/Verloren.jpg' },
                { id: 'Mountain Fortress', url: '../../assets/img/maps/MountainFortress.jpg' },
                { id: 'Fort of Honour', url: '../../assets/img/maps/FortofHonour.jpg' },
                { id: 'Beairteas', url: '../../assets/img/maps/Beairteas.jpg' },
                { id: 'Castellum', url: '../../assets/img/maps/Castellum.jpg' },
                { id: "San'Di'Boush", url: '../../assets/img/maps/SanDiBoush.jpg' },
                { id: 'Naval Outpost', url: '../../assets/img/maps/NavalOutpost.jpg' },
                { id: 'Nord Town', url: '../../assets/img/maps/NordTown.jpg' },
                { id: 'Reveran Village', url: '../../assets/img/maps/ReveranVillage.jpg' },
                { id: 'The Cage', url: '../../assets/img/maps/TheCage.jpg' },
                { id: 'Legacy Town', url: '../../assets/img/maps/LegacyTown.jpg' }
            ]
        }
    },
    components: {
        Carousel,
        Slide,
        Navigation
    },
    methods: {
        getImage(imagePath) {
            return new URL(imagePath, import.meta.url).href
        }
    }
}
</script>

<style>
.carousel-caption {
    position: absolute;
    right: 15%;
    bottom: 20px;
    left: 15%;
}
</style>
