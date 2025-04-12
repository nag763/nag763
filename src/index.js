import { scroll, animate } from "motion"

const items = document.querySelectorAll(".whoami-container")

// Animate gallery horizontally during vertical scroll
scroll(
    animate(".whoami-group", {
        transform: ["none", `translateX(-${items.length - 1}00vw)`],
    }),
    { target: document.querySelector(".whoami-group-container") }
)

// Progress bar representing gallery scroll
scroll(animate(".progress", { scaleX: [0, 1] }), {
    target: document.querySelector(".whoami-group-container"),
})