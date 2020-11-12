.<template>
  <div class="text" @mouseenter="handleEnter" @mouseleave="handleLeave">
      {{value}}
  </div>
</template>

<script>
export default {
    name: 'txt',
    props: {
        value: {
            type: String
        }
    },
    methods: {
        handleEnter (e) {
            let innerWidth = e.target.scrollWidth;
            let pCell = function getCellParent () {
                let el = e.target;
                while (el.parentNode.tagName.toLowerCase() !== 'td') {
                    el = el.parentNode;
                }
                return el
            }();
            outerWidth = pCell.clientWidth;
            
            if (innerWidth > outerWidth) {
                this.$emit('show-popper', {
                    txt: e.target.innerText,
                    referEle: pCell
                });
            }
        },
        handleLeave (e) {
            let innerWidth = e.target.scrollWidth;
            let pCell = function getCellParent () {
                let el = e.target;
                while (el.parentNode.tagName.toLowerCase() !== 'td') {
                    el = el.parentNode;
                }
                return el
            }();
            outerWidth = pCell.clientWidth;
            
            if (innerWidth > outerWidth) {
                this.$emit('hide-popper');
            }
            // this.$emit('hide-popper');
        }
    }
}
</script>

<style lang="stylus" scoped>
.text 
    color #606266;
    padding 0 10px;
    display inline-block
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>