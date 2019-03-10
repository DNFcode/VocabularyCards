// import CardsPage from "./components/CardsPage"
// import StatsPage from "./components/StatsPage"
// import SettingsPage from "./components/SettingsPage"
// import GlossaryPage from "./components/GlossaryPage"
// import { NewCardDialog } from "./components/NewCardDialog"
// import { EditCardDialog } from "./components/EditCardDialog"

// export enum Position {
//   Top,
//   Bottom,
// }

// class View {
//   constructor(
//     private url: string,
//     private view: React.ReactNode,
//     public children?: { [route: string]: View }
//   ) {}
// }

// class Routing {
//   learning = StackView(LearningPage, [])
// }

// const routing = {
//   cards: CardsPage,
// }

// export default [
//   {
//     path: "/cards",
//     component: CardsPage,
//   },
//   {
//     path: "/stats",
//     component: StatsPage,
//   },
//   {
//     path: "/settings",
//     component: SettingsPage,
//   },
//   {
//     path: "/glossary",
//     component: GlossaryPage,
//     children: [
//       {
//         path: "/glossary/actions/:id",
//         component: EditCardDialog,
//       },
//       {
//         path: "/glossary/new",
//         component: NewCardDialog,
//       },
//       {
//         path: "/glossary/card/:id",
//         component: EditCardDialog,
//       },
//     ],
//   },
// ]
