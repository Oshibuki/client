export default function (rank) {
    return new URL(`../assets/img/ranks/${rank}.png`, import.meta.url).href
}
