export default function (num,total) {
    if (num == 0 || total == 0) return 0
    num = num/total
    return new Intl.NumberFormat('default', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num );
  }
