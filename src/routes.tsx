import CardsPage from "./components/CardsPage"
import StatsPage from "./components/StatsPage"
import SettingsPage from "./components/SettingsPage"
import GlossaryPage from "./components/GlossaryPage"
import NewCardPage from "./components/NewCardPage"

export enum Position {
  Top,
  Bottom,
}

export default [
  {
    path: "/cards",
    component: CardsPage,
    navigation: Position.Bottom,
  },
  {
    path: "/stats",
    component: StatsPage,
    navigation: Position.Bottom,
  },
  {
    path: "/settings",
    component: SettingsPage,
    navigation: Position.Bottom,
  },
  {
    path: "/glossary",
    component: GlossaryPage,
    navigation: Position.Bottom,
  },
  {
    path: "/glossary/new",
    component: NewCardPage,
    navigation: Position.Top,
  },
]
