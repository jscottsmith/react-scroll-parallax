export const getSelectedIcon = ({
  currentValue,
  items
}) => {
  const selectedItem = currentValue != null && items.find(item => item.value === currentValue);
  const selectedIcon = selectedItem && selectedItem.icon;
  return selectedIcon;
};