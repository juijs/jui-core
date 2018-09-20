export default {
    name: "util.sort",
    extend: null,
    component: function () {
        var QuickSort = function (array, isClone) {
            var compareFunc = null,
                array = (isClone) ? array.slice(0) : array;

            function swap(indexA, indexB) {
                var temp = array[indexA];

                array[indexA] = array[indexB];
                array[indexB] = temp;
            }

            function partition(pivot, left, right) {
                var storeIndex = left, pivotValue = array[pivot];
                swap(pivot, right);

                for (var v = left; v < right; v++) {
                    if (compareFunc(array[v], pivotValue) || !compareFunc(pivotValue, array[v]) && v % 2 == 1) {
                        swap(v, storeIndex);
                        storeIndex++;
                    }
                }

                swap(right, storeIndex);

                return storeIndex;
            }

            this.setCompare = function (func) {
                compareFunc = func;
            }

            this.run = function (left, right) {
                var pivot = null,
                    newPivot = null;

                if (typeof left !== 'number') {
                    left = 0;
                }

                if (typeof right !== 'number') {
                    right = array.length - 1;
                }

                if (left < right) {
                    pivot = left + Math.ceil((right - left) * 0.5);
                    newPivot = partition(pivot, left, right);

                    this.run(left, newPivot - 1);
                    this.run(newPivot + 1, right);
                }

                return array;
            }
        }

        return QuickSort;
    }
}