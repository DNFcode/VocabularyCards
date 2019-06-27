import CardsPage from "./components/CardsPage"
import StatsPage from "./components/StatsPage"
import SettingsPage from "./components/SettingsPage"
import GlossaryPage from "./components/GlossaryPage"
import { NewCardDialog } from "./components/NewCardDialog"
import { EditCardDialog } from "./components/EditCardDialog"
import { computed } from "mobx"

class Routing {
  get currentRoute() {
    return window.location.pathname
  }
}

const routes = [
  {
    path: "/cards",
    component: CardsPage,
  },
  {
    path: "/stats",
    component: StatsPage,
  },
  {
    path: "/settings",
    component: SettingsPage,
  },
  {
    path: "/glossary",
    component: GlossaryPage,
    children: [
      {
        path: "/glossary/actions/:id",
        component: EditCardDialog,
        action: true,
      },

      {
        path: "/glossary/card/:id",
        component: EditCardDialog,
      },
    ],
  },
  {
    path: "/glossary/new",
    component: NewCardDialog,
    action: true,
  },
]

function goTo(from: string, to: string) {}
