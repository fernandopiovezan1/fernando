<template>
  <q-page class="q-pa-md body-class">
    <template v-if="data">
      <dynamic-table
        :title="tableTitle"
        :data="data"
        :columns="columns"
        :actions="['action 1', 'action 2', 'action 3']"
        :search-field="filter"
        :inner-loading="loading"
        theme="secondary"
        @search-change="filter = $event"
        :selection-mode="selectionMode"
        @selection-mode-change="
          selectionMode = $event ? 'multiple' : 'single'
          modeChanged()
        "
        @action-1="doAction"
        @action-2="doAction"
        :grid="$q.platform.is.mobile"
        actions-display-type="bottom menu"
        action-invoke-type="instant"
        search-input-placeholder="Search Name"
        search
        grid-card-style="vertical"
        :row-options="[5, 10, 20, 30, 40, 50]"
        :pagination="pagination"
        ref="table"
        @update:pagination="pagChange"
      >
        <template v-if="mode === 'grid'" v-slot:item="props">
          <div
            class="q-pa-xs col-xs-6 col-sm-4 col-md-3 col-lg-3 grid-style-transition cursor-pointer"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card
              :class="`${props.selected ? $q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2' : ''}`"
              @click.native="props.selected = !props.selected"
            >
              <template v-if="gridCardStyle === 'horizontal'">
                <q-card-section class="relative-position">
                  <q-checkbox
                    v-if="toggleSelectionMode"
                    dense
                    :color="theme"
                    v-model="props.selected"
                    :label="props.cols[0].value"
                    class="ellipsis-2-lines"
                  />
                  <div
                    v-if="!toggleSelectionMode"
                    class="ellipsis-2-lines"
                  >{{ props.cols[0].value }}</div>
                </q-card-section>
                <q-separator/>
                <q-card-section class="q-pa-none">
                  <q-list>
                    <template v-for="(col, i) in props.cols">
                      <q-item v-if="i > 0" :key="col.name">
                        <q-item-section>
                          <q-item-label lines="1" caption>{{ col.label }}</q-item-label>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label lines="1" class="text-right">{{ col.value }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-list>
                </q-card-section>
              </template>
              <template v-else>
                <q-list>
                  <q-item v-for="(col, i) in props.cols" :key="i">
                    <q-item-section>
                      <q-item-label lines="1" caption>
                        {{
                        col.label
                        }}
                      </q-item-label>
                      <q-item-label
                        :lines="
                        typeof col.value === 'string' &&
                        (col.value.includes(' ') || col.value.includes('-'))
                          ? 3
                          : 1
                      "
                      >{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </template>

              <q-menu
                touch-position
                v-if="
                actions &&
                  (actionsDisplayType.includes('menu') ||
                    actionsDisplayType === 'all') &&
                  selected.length > 0 &&
                  props.selected
              "
                context-menu
              >
                <q-list style="min-width: 100px">
                  <template v-for="(action, idx) in actions">
                    <q-item
                      :key="idx"
                      @click.native="$emit(action.replace(' ', '-'), selected)"
                      :clickable="!innerLoading"
                      :disable="innerLoading"
                      v-close-popup
                    >
                      <q-item-section>
                        {{
                        capitalize(`${action}`)
                        }}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-menu>
              <q-tooltip
                :disable="
                $q.platform.is.mobile &&
                  actions &&
                  (actionsDisplayType === 'menu' ||
                    actionsDisplayType === 'all')
              "
                :delay="1000"
                anchor="bottom middle"
                v-close-popup
                self="bottom middle"
                :offset="[10, 10]"
              >{{ menuToolTipMessage }}</q-tooltip>
            </q-card>
          </div>
        </template>
      </dynamic-table>
    </template>
    <template v-else>
      <span>No data, do something like fetch data from server etc...</span>
    </template>
  </q-page>
</template>

<script>
import DynamicTable from 'components/Tables/Dynamic'
export default {
  components: {
    DynamicTable
  },
  methods: {
    modeChanged() {
      console.log('modechanged', this.selectionMode)
    },
    doAction(val) {
      console.log('onAction', val)
    },
    pagChange(evt) {
      console.log('pagChange', evt)
      this.pagination = evt
    }
  },
  data() {
    return {
      pagination: { rowsPerPage: 10, page: 1 },
      tableTitle: 'My Custom Table',
      selectionMode: 'multiple',
      loading: false,
      filter: '',
      selected: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'rating',
          align: 'center',
          label: 'Rating',
          field: 'rating',
          sortable: true,
          isRating: true,
          style: 'width: 150px'
        },
        {
          name: 'calories',
          align: 'center',
          label: 'Calories',
          field: 'calories',
          sortable: true
        },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        {
          name: 'calcium',
          label: 'Calcium (%)',
          field: 'calcium',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'iron',
          label: 'Iron (%)',
          field: 'iron',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
          rating: 1
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
          rating: 3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
          rating: 5
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
          rating: 2
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
          rating: 4
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
          rating: 2
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%',
          rating: 1
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%',
          rating: 1
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%',
          rating: 1
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
          rating: 1
        },
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
          rating: 1
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
          rating: 3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
          rating: 5
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
          rating: 2
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
          rating: 4
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
          rating: 2
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%',
          rating: 1
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%',
          rating: 1
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%',
          rating: 1
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
          rating: 1
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
          rating: 1
        },
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
          rating: 1
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
          rating: 3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
          rating: 5
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
          rating: 2
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
          rating: 4
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
          rating: 2
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%',
          rating: 1
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%',
          rating: 1
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%',
          rating: 1
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
          rating: 1
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
          rating: 1
        },
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
          rating: 1
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
          rating: 3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
          rating: 5
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
          rating: 2
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
          rating: 4
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
          rating: 2
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%',
          rating: 1
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%',
          rating: 1
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%',
          rating: 1
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
          rating: 1
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
          rating: 1
        },
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
          rating: 1
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
          rating: 3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
          rating: 5
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
          rating: 2
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
          rating: 4
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
          rating: 2
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%',
          rating: 1
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%',
          rating: 1
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%',
          rating: 1
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
          rating: 1
        }
      ]
    }
  },
  watch: {},
  created() {}
}
</script>

<style lang="stylus">
</style>
