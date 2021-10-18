import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import {Sidebar} from '../components/Sidebar';
import {Header} from '../components/Header';


const Chart = dynamic(() => import ('react-apexcharts'), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false,
  },
  xaxis:{
    type: "datetime",
    axisBorder:{
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-10-01T00:00:000Z',
      '2021-10-02T00:00:000Z',
      '2021-10-03T00:00:000Z',
      '2021-10-04T00:00:000Z',
      '2021-10-05T00:00:000Z',
      '2021-10-07T00:00:000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }

  }
} as const;

  const series = [
    {name: 'series1', data: [31, 120, 10, 28, 61, 80]}
  ];

export default function Dashboard() {
  
  
  return(
    <Flex direction="column" h="100vh">
      <Header/>

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar/>

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4"> Bookings</Text>  
            <Chart options={options} series={series} type="area" height={160}/>
          </Box>
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4"> Opening fees </Text>  
            <Chart options={options} series={series} type="area" height={160}/>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
    
  )
}