.<template>
    <validation-provider :rules="c.rules" :name="c.name" v-slot="{ failed }"> 
        <component class='t-input' :is="componentMap[type] || 'el-input'" :value="value"/>  
    </validation-provider>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'el-input'
        },
        value: String,
    },
    computed: {
        componentMap() {
            return {
                'input': 'el-input',
                'select': 'el-select',
                'date': 'el-date-picker',
            }
        }
    },
}
</script>

<style lang="stylus" scoped>

</style>