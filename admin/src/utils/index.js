export default {
    /**
   * 树形菜单数据处理成索引0所有一级分类，索引1所有子类
   * @param {array} categoryData 列表数据
   * @return {array}
   */
    getCategory(categoryData, menuArr = []) {
        this.getSorting(categoryData)
        categoryData.forEach((v) => {
            if (v.pid == 0) {
                (menuArr[0] || (menuArr[0] = [])).push(v);
            } else {
                (menuArr[v.pid] || (menuArr[v.pid] = [])).push(v);
            }
        });

        return menuArr;
    },

    /**
     * 处理children数据结构的菜单数据
     * @param {array} menuData 表格数据
     * @param {array} arr 空数组，用于存值
     * @return {array}
     */
    getChildrenTree(menuData, arr) {
        for (let i in arr) {
            // 如果查找的子类存在就遍历
            let pidArr = menuData[arr[i].id];

            if (pidArr != undefined) {
                for (let j in pidArr) {
                    (arr[i].childrens || (arr[i].childrens = [])).push(pidArr[j]);
                }

                let getChildrens = this.getChildrenTree(menuData, arr[i].childrens);
                arr[i].childrens = getChildrens;
            } else {
                arr[i].childrens = [];
            }
        }

        return arr;
    },

    /**
    * 处理表格数据，用于可以展开分类表格
    * @param {object} Vue 对象
    * @param {array} menuData 处理好的children表格数据
    * @param {array} parent 父数组，默认传NULL
    * @param {int} levelCount 层级统计，默认传NULL
    * @param {boolean} expandedAll true-全部关闭，flase-全部展开
    * @return {array}
    */
    getTreeToArray(Vue, menuData, parent, levelCount, expandedAll) {
        let tmp = [];

        menuData.forEach(item => {
            // 是否展开或关闭全部
            if (item.expanded === undefined) {
                item.expanded = expandedAll;
            }

            // 父对象，默认为NULL
            if (parent) {
                item.parent = parent;
            }

            // 获取层级
            let level = 0;

            if (levelCount !== undefined && levelCount !== null) {
                level = levelCount + 1;
            }

            item.level = level;

            // 放入数组，递归下级分类
            tmp.push(item);

            if (item.childrens && item.childrens.length > 0) {
                let childrens = this.getTreeToArray(Vue, item.childrens, item, level, expandedAll);
                tmp = tmp.concat(childrens);
            }
        });

        return tmp;
    },

    /**
     * 排序
     */
    getSorting(array) {
        array.sort((a, b) => {
            return a.sort - b.sort
        })
    }
}