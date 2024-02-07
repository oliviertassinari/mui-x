import * as React from 'react';
import { DataGrid, GRID_STRING_COL_DEF } from '@mui/x-data-grid';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

function GridSparklineCell(props) {
  if (props.value == null) {
    return null;
  }

  return (
    <SparkLineChart
      data={props.value}
      width={props.colDef.computedWidth}
      plotType={props.plotType}
    />
  );
}

const sparklineColumnType = {
  ...GRID_STRING_COL_DEF,
  type: 'custom',
  resizable: false,
  filterable: false,
  sortable: false,
  editable: false,
  groupable: false,
  renderCell: (params) => <GridSparklineCell {...params} />,
};

const columns = [
  { field: 'name', headerName: 'Package name', width: 180 },
  {
    field: 'monthlyDownloads',
    ...sparklineColumnType,
    headerName: 'Monthly DLs (line)',
    width: 150,
  },
  {
    field: 'monthlyDownloadsBar',
    ...sparklineColumnType,
    headerName: 'Monthly DLs (bar)',
    renderCell: (params) => <GridSparklineCell {...params} plotType="bar" />,
    width: 150,
    valueGetter: (value, row) => row.monthlyDownloads,
  },
  {
    field: 'lastMonthDownloads',
    headerName: 'Last month DLs',
    type: 'number',
    valueGetter: (value, row) =>
      row.monthlyDownloads[row.monthlyDownloads.length - 1],
    width: 150,
  },
];

export default function SparklineColumn() {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

const rows = [
  {
    name: 'react-datepicker',
    monthlyDownloads: [
      469172, 488506, 592287, 617401, 640374, 632751, 668638, 807246, 749198, 944863,
      911787, 844815, 992022, 1143838, 1446926, 1267886, 1362511, 1348746, 1560533,
      1670690, 1695142, 1916613, 1823306, 1683646, 2025965, 2529989, 3263473,
      3296541, 3041524, 2599497, 2719473, 2610351, 2912067, 3079330, 2871077,
      2684197, 2852679, 3227844, 3867488, 3582735, 3454135, 3799207, 3813848,
      3839009, 4054869, 4319042, 4388671, 4149743, 4519686, 4810266, 5621007,
      5260194, 5563038, 5837767, 5342797, 6427653, 6611624, 6532709, 6886198,
      6071253, 6730371, 7097963, 8001343, 6867713, 7688481,
    ],
    id: 0,
  },
  {
    name: '@mui/x-date-pickers',
    monthlyDownloads: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      557488, 1341471, 2044561, 2206438, 2682543, 2772941, 2987705, 3264829, 2972821,
      3489759, 3698191, 4410492, 4201780, 4892509,
    ],
    id: 1,
  },
  {
    name: 'flatpickr',
    monthlyDownloads: [
      166896, 190041, 248686, 226746, 261744, 271890, 332176, 381123, 396435, 495620,
      520278, 460839, 704158, 559134, 681089, 712384, 765381, 771374, 851314, 907947,
      903675, 1049642, 1003160, 881573, 1072283, 1139115, 1382701, 1395655, 1355040,
      1381571, 1495175, 1513409, 1673240, 1772826, 1712051, 1641944, 1718714,
      1849475, 2226745, 2104910, 1967886, 2096636, 1991424, 2155674, 2263360,
      2261195, 2324734, 2075858, 2297512, 2368925, 2886678, 2543833, 2835623,
      2916036, 2638289, 3050516, 2950882, 3042688, 3290024, 2790747, 3196521,
      3146755, 3562973, 3082832, 3477021,
    ],
    id: 2,
  },
  {
    name: 'react-day-picker',
    monthlyDownloads: [
      264651, 311845, 436558, 439385, 520413, 533380, 562363, 533793, 558029, 791126,
      649082, 566792, 723451, 737827, 890859, 935554, 1044397, 1022973, 1129827,
      1145309, 1195630, 1358925, 1373160, 1172679, 1340106, 1396974, 1623641,
      1687545, 1581634, 1550291, 1718864, 1578447, 1618394, 1697784, 1564166,
      1400088, 1471853, 1730190, 1994936, 1786010, 1713263, 1839730, 1714299,
      1753411, 1885780, 1902870, 1970994, 1762571, 1989425, 2043994, 2476663,
      2151717, 2243360, 2371687, 2046381, 2468153, 2514297, 2660758, 2887687,
      2337575, 2700261, 2873230, 3323961, 3026604, 3244131,
    ],
    id: 3,
  },
  {
    name: 'react-dates',
    monthlyDownloads: [
      251871, 262216, 402383, 396459, 378793, 406720, 447538, 451451, 457111, 589821,
      640744, 504879, 626099, 662007, 754576, 768231, 833019, 851537, 972306,
      1014831, 1027570, 1189068, 1119099, 987244, 1197954, 1310721, 1480816, 1577547,
      1854053, 1791831, 1817336, 1757624, 1859245, 1814024, 1925249, 1867506,
      1892138, 2001963, 2538000, 2327809, 2277795, 2335804, 2278370, 2258587,
      2314794, 2376233, 2315449, 1948923, 2114500, 2208357, 2471023, 2172957,
      2349786, 2481612, 2283701, 2534949, 2351510, 2074785, 2170915, 1882137,
      2087930, 2423606, 3085474, 2656079, 2861712,
    ],
    id: 4,
  },
  {
    name: '@material-ui/pickers',
    monthlyDownloads: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 21003, 112544, 223356, 357258,
      427403, 592436, 643442, 652000, 851649, 997585, 1237884, 1323019, 1329075,
      1446751, 1603441, 1605489, 1770242, 1926553, 1957029, 1917431, 2047824,
      2342019, 2952485, 2850314, 2905856, 3145594, 3162610, 3356708, 3574777,
      3581429, 3588626, 3215994, 3209791, 3229263, 3577594, 2982893, 3072732,
      3083998, 2802316, 3345024, 3224987, 2853866, 2931270, 2419496, 2624119,
      2614166, 3072423, 2550430, 2605515,
    ],
    id: 5,
  },
  {
    name: 'react-calendar',
    monthlyDownloads: [
      13671, 16918, 27272, 34315, 42212, 56369, 64241, 77857, 70680, 91093, 108306,
      94734, 132289, 133860, 147706, 158504, 192578, 207173, 220052, 233496, 250091,
      285557, 280329, 262382, 330528, 337111, 398561, 452800, 432857, 452775, 541950,
      481764, 537173, 585916, 573412, 552463, 582320, 665610, 757420, 733958, 731212,
      786886, 793785, 836271, 899076, 950749, 981813, 913076, 1037772, 1111379,
      1372103, 1316354, 1353646, 1436614, 1349791, 1542007, 1549215, 1576125,
      1701436, 1477188, 1756447, 1804657, 2024066, 1802328, 1975321,
    ],
    id: 6,
  },
  {
    name: 'react-datetime',
    monthlyDownloads: [
      474506, 514529, 624998, 634955, 693156, 762051, 822194, 999794, 1028527,
      1264039, 1074500, 874769, 945614, 841453, 859657, 822025, 886668, 810302,
      849949, 872377, 783857, 887114, 789091, 698810, 800283, 789543, 919445,
      1026095, 1130903, 1021922, 971668, 922021, 875551, 849529, 891653, 806460,
      740611, 804504, 1008750, 1080174, 917512, 886872, 874670, 853764, 862825,
      894367, 919854, 807459, 858222, 858151, 967551, 897111, 902405, 944057, 879880,
      1090124, 1081206, 1026493, 1002294, 832895, 955662, 972831, 1166432, 1042367,
      1025499,
    ],
    id: 7,
  },
  {
    name: 'react-date-picker',
    monthlyDownloads: [
      49274, 48553, 64322, 58823, 59113, 66912, 70695, 74530, 66425, 84803, 86193,
      69178, 94987, 89205, 105340, 98078, 112268, 111998, 122224, 127661, 133198,
      138867, 128836, 120011, 158852, 154510, 175291, 197496, 224817, 194683, 220130,
      210720, 233037, 252119, 240970, 233944, 256490, 298853, 340486, 318831, 317291,
      335995, 336665, 343706, 356435, 376861, 379366, 355358, 408157, 425652, 499923,
      471759, 512219, 511044, 470863, 531581, 534128, 531059, 613792, 527997, 594540,
      637346, 788377, 721212, 644692,
    ],
    id: 8,
  },
  {
    name: '@react-spectrum/datepicker',
    monthlyDownloads: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 164, 691, 402,
      1239, 1536, 1853, 2163, 4151, 9644, 15667, 16426, 17786, 21804, 21358, 24062,
      30870, 34053, 35400, 37834,
    ],
    id: 9,
  },
];
