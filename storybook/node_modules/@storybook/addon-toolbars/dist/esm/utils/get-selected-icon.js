import "core-js/modules/es.array.find.js";
export var getSelectedIcon = function getSelectedIcon(_ref) {
  var currentValue = _ref.currentValue,
      items = _ref.items;
  var selectedItem = currentValue != null && items.find(function (item) {
    return item.value === currentValue;
  });
  var selectedIcon = selectedItem && selectedItem.icon;
  return selectedIcon;
};