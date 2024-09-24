<script setup>
import { eventService } from "@/services/EventService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { watch } from "vue";
import { useRoute } from "vue-router";


const route = useRoute()
watch(() => route.params.eventId, () => {
  findEventById()
}, { immediate: true })

async function findEventById() {
  try {
    const eventId = route.params.eventId
    await eventService.findEventById(eventId)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}
</script>


<template>

  <body>
    <h1> this is the event Page</h1>
    <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt nulla ducimus minima fugiat magni
      necessitatibus nihil nostrum, quam rem, modi, delectus qui! Sequi ea magni veniam aliquam, perspiciatis eveniet
      blanditiis?
      Impedit magni vel, dignissimos iusto, facilis sit aperiam earum quisquam inventore repellat reiciendis optio.
      Corrupti dolores doloribus eaque consequuntur repellendus dicta laudantium, sint fugiat sunt qui error, eligendi a
      aperiam!
      Expedita tenetur similique velit vitae dolor earum aspernatur, eligendi illo illum debitis quos dolorem esse eaque
      maxime provident necessitatibus saepe labore officia repudiandae totam asperiores magni ipsum distinctio ducimus!
      Architecto.
      Sapiente aperiam, nostrum mollitia corporis blanditiis placeat tenetur numquam tempora optio autem non quibusdam
      corrupti? Reprehenderit, voluptatem quidem soluta sed quae, accusantium fuga veritatis, autem rerum ducimus
      dolorum amet perspiciatis.
      Officia, recusandae minus similique vitae necessitatibus blanditiis fuga rem dolor dolore est veritatis aspernatur
      eveniet eum quam repellendus ullam magni obcaecati expedita omnis dolorem. Facilis blanditiis iste unde similique
      itaque!
      Sunt nesciunt voluptates facilis magni est veniam, perferendis asperiores distinctio repellendus tempore placeat
      exercitationem aut harum pariatur in dolores recusandae eaque molestiae facere cupiditate laudantium tenetur vitae
      ipsa! Modi, alias!
      Dignissimos beatae veniam at exercitationem omnis nemo saepe voluptatibus facilis fugiat molestiae sapiente
      accusantium esse praesentium, voluptate quos similique aspernatur voluptates est cupiditate facere ipsa animi,
      maxime quibusdam. Aliquid, alias?
      Cum natus inventore repellendus iusto ducimus corrupti. Corrupti neque aut laborum, doloribus necessitatibus,
      recusandae iure velit voluptatibus temporibus consequuntur beatae. Numquam amet nisi odio omnis quae ratione iste
      molestias et.
      Nihil repellat quas necessitatibus accusantium voluptatem voluptates labore ipsam, minus vero facilis asperiores
      hic nisi nobis nam quo maiores similique veniam maxime obcaecati corporis ullam aperiam. Ex repellendus voluptatem
      ullam?
      Hic ab voluptatem explicabo accusantium corporis, aliquid maxime quisquam qui at nemo quis tempore soluta quidem
      rem officia adipisci quos aperiam iusto iste dicta! Distinctio repellat earum voluptatem necessitatibus debitis.
    </h2>
  </body>
</template>


<style lang="scss" scoped></style>