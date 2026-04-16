export const services = [
  {
    id: 'electrician',
    name: 'Electrician',
    description: 'Fan, wiring, switches, inverter and home electrical repairs.',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80',
    workers: [
      { id: 'el-1', name: 'Ravi Kumar', experience: '6 years', rating: 4.7, phone: '9000000001', price: 399, skills: ['Wiring', 'Switch board', 'Fan repair'] },
      { id: 'el-2', name: 'Amit Sharma', experience: '8 years', rating: 4.8, phone: '9000000002', price: 499, skills: ['MCB repair', 'Inverter setup', 'Lighting'] },
      { id: 'el-3', name: 'Suresh Naik', experience: '4 years', rating: 4.5, phone: '9000000003', price: 349, skills: ['House wiring', 'Sockets', 'Door bell'] }
    ]
  },
  {
    id: 'plumber',
    name: 'Plumber',
    description: 'Tap leakage, bathroom fittings, motor pipe and tank line service.',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80',
    workers: [
      { id: 'pl-1', name: 'Rahul Yadav', experience: '7 years', rating: 4.6, phone: '9000000011', price: 449, skills: ['Leak fixing', 'Tap installation', 'Motor pipe'] },
      { id: 'pl-2', name: 'Imran Khan', experience: '5 years', rating: 4.4, phone: '9000000012', price: 399, skills: ['Bathroom fitting', 'Sink repair', 'Drain cleaning'] },
      { id: 'pl-3', name: 'Kiran Das', experience: '9 years', rating: 4.9, phone: '9000000013', price: 549, skills: ['Tank connection', 'Pipeline work', 'Pressure issues'] }
    ]
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    description: 'Door repair, furniture assembly, shelves and modular fitting.',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80',
    workers: [
      { id: 'ca-1', name: 'Mahesh Patel', experience: '10 years', rating: 4.8, phone: '9000000021', price: 599, skills: ['Door work', 'Table repair', 'Cupboard fitting'] },
      { id: 'ca-2', name: 'Venkat Rao', experience: '6 years', rating: 4.5, phone: '9000000022', price: 499, skills: ['Bed assembly', 'Wood polish', 'Shelf installation'] },
      { id: 'ca-3', name: 'Arif Ali', experience: '4 years', rating: 4.3, phone: '9000000023', price: 429, skills: ['Chair repair', 'Drilling', 'Locks fitting'] }
    ]
  },
  {
    id: 'ac-repair',
    name: 'AC Repair',
    description: 'AC cleaning, gas check, installation and cooling issues.',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=900&q=80',
    workers: [
      { id: 'ac-1', name: 'Naveen Reddy', experience: '5 years', rating: 4.6, phone: '9000000031', price: 699, skills: ['Split AC service', 'Cooling repair', 'Gas check'] },
      { id: 'ac-2', name: 'Faizan Ahmed', experience: '8 years', rating: 4.9, phone: '9000000032', price: 799, skills: ['Installation', 'PCB check', 'Copper piping'] }
    ]
  },
  {
    id: 'cleaning',
    name: 'Home Cleaning',
    description: 'Deep cleaning, kitchen cleaning, bathroom and sofa cleaning.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80',
    workers: [
      { id: 'cl-1', name: 'Pooja Verma', experience: '3 years', rating: 4.7, phone: '9000000041', price: 999, skills: ['Deep cleaning', 'Kitchen cleaning', 'Bathroom cleaning'] },
      { id: 'cl-2', name: 'Sneha Nair', experience: '4 years', rating: 4.8, phone: '9000000042', price: 1099, skills: ['Sofa cleaning', 'Floor treatment', 'Sanitization'] }
    ]
  },
  {
    id: 'painting',
    name: 'Painter',
    description: 'Wall putty, interior paint, exterior paint and texture work.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80',
    workers: [
      { id: 'pa-1', name: 'Bala Krishna', experience: '11 years', rating: 4.9, phone: '9000000051', price: 1299, skills: ['Interior paint', 'Texture finish', 'Waterproof coating'] },
      { id: 'pa-2', name: 'Deepak Singh', experience: '7 years', rating: 4.6, phone: '9000000052', price: 999, skills: ['Putty work', 'Exterior paint', 'Primer coating'] }
    ]
  }
];
