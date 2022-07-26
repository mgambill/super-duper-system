import { createRouter, createWebHistory } from "vue-router"
import Empty from "../../views/Empty.vue"
import Home from "../../views/Home.vue"
import Rules from "../../views/Rules.vue"
import RulesCollection from "../../views/RulesCollection.vue"
import RulesList from "../../views/RulesList.vue"
import RulesSingle from "../../views/RulesSingle.vue"
import Schemas from "../../views/Schemas.vue"
import SchemasList from "../../views/SchemasList.vue"
import SchemasSingle from "../../views/SchemasSingle.vue"
import Playground from "../../views/Playground.vue"
import PlaygroundList from "../../views/PlaygroundList.vue"
import PlaygroundSingle from "../../views/PlaygroundSingle.vue"

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: "Home"
    }
  },
  {
    path: '/users/:id',
    name: 'users',
    component: Empty
  },

  {
    path: "/playgrounds",
    name: 'playground-list',
    component: PlaygroundList,
  },
  {
    path: "/playgrounds/:playground_id",
    name: 'playground-single',
    component: PlaygroundSingle,
    props: true
  },
  {
    path: '/rule-collections',
    component: Rules,
    children: [
      {
        path: "",
        name: 'rules-list',
        component: RulesList
      },
      {
        path: ":collection_id",
        name: 'rule-collection',
        component: RulesCollection,
        props: true,
        children: [
          {
            path: ":rule_id",
            name: 'rule-single',
            component: RulesSingle,
            props: true
          }
        ]
      }
    ]
  },
  {
    path: '/schemas',
    component: Schemas,
    children: [
      {
        path: "",
        name: 'schemas-list',
        component: SchemasList
      },
      {
        path: ":collection_id/:rule_id",
        name: 'schemas-single',
        component: SchemasSingle,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router