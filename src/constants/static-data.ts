export const staticUsers = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'superadmin@noshnow.com',
    password: 'superadmin123',
    role: 'superadmin',
    phone: '+92 300 0000000',
    address: 'Admin Office, Karachi',
    assignedRestaurant: null, // SuperAdmin can manage all restaurants
  },
  {
    id: '2',
    name: 'Admin User 1',
    email: 'admin1@noshnow.com',
    password: 'admin123',
    role: 'admin',
    phone: '+92 300 1111111',
    address: 'Admin Office, Karachi',
    assignedRestaurant: 'restaurant_1', // Pizza Palace
  },
  {
    id: '3',
    name: 'Admin User 2',
    email: 'admin2@noshnow.com',
    password: 'admin123',
    role: 'admin',
    phone: '+92 300 2222222',
    address: 'Admin Office, Karachi',
    assignedRestaurant: 'restaurant_2', // Burger King
  },
  {
    id: '4',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
    phone: '+92 300 3333333',
    address: '123 Main Street, Karachi',
    assignedRestaurant: null,
  },
  {
    id: '5',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'user123',
    role: 'user',
    phone: '+92 300 4444444',
    address: '456 Block 6, Karachi',
    assignedRestaurant: null,
  },
  {
    id: '6',
    name: 'Ahmed Ali',
    email: 'ahmed@noshnow.com',
    password: 'rider123',
    role: 'rider',
    phone: '+92 300 5555555',
    address: '789 Gulshan, Karachi',
    assignedRestaurant: null,
    vehicleType: 'Motorcycle',
    licenseNumber: 'KHI-2024-001',
    status: 'Available',
  },
  {
    id: '7',
    name: 'Sara Khan',
    email: 'sara@noshnow.com',
    password: 'rider123',
    role: 'rider',
    phone: '+92 300 6666666',
    address: '321 DHA, Karachi',
    assignedRestaurant: null,
    vehicleType: 'Bicycle',
    licenseNumber: 'KHI-2024-002',
    status: 'Busy',
  },
];

export const staticRestaurants = [
  {
    id: 'restaurant_1',
    name: 'Pizza Palace',
    category: 'Pizza',
    rating: 4.5,
    deliveryTime: '30-45 min',
    address: '123 Main Street, Karachi',
    phone: '+92 300 1234567',
    email: 'info@pizzapalace.com',
    status: 'Active',
    adminId: '2', // Assigned to Admin User 1
    totalOrders: 156,
    revenue: '$2,450',
  },
  {
    id: 'restaurant_2',
    name: 'Burger King',
    category: 'Fast Food',
    rating: 4.2,
    deliveryTime: '25-35 min',
    address: '456 Block 6, Karachi',
    phone: '+92 300 2345678',
    email: 'contact@burgerking.com',
    status: 'Active',
    adminId: '3', // Assigned to Admin User 2
    totalOrders: 89,
    revenue: '$1,890',
  },
  {
    id: 'restaurant_3',
    name: 'Sushi Master',
    category: 'Japanese',
    rating: 4.8,
    deliveryTime: '40-50 min',
    address: '789 Clifton, Karachi',
    phone: '+92 300 3456789',
    email: 'hello@sushimaster.com',
    status: 'Inactive',
    adminId: null, // Not assigned to any admin
    totalOrders: 234,
    revenue: '$4,120',
  },
];

export const userRoles = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  USER: 'user',
  RIDER: 'rider',
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];

export const staticOrders = [
  {
    id: 'order_1',
    customerName: 'John Doe',
    customerPhone: '+92 300 3333333',
    restaurantName: 'Pizza Palace',
    restaurantAddress: '123 Main Street, Karachi',
    deliveryAddress: '456 Block 6, Karachi',
    orderItems: [
      { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
      { name: 'Coca Cola', quantity: 2, price: 2.5 },
    ],
    totalAmount: 17.99,
    deliveryFee: 2.0,
    riderEarnings: 3.5,
    status: 'pending', // pending, accepted, picked_up, delivered, cancelled
    orderTime: '2024-01-15T10:30:00Z',
    estimatedDeliveryTime: '2024-01-15T11:00:00Z',
    riderId: '6',
    specialInstructions: 'Ring the doorbell twice',
  },
  {
    id: 'order_2',
    customerName: 'Jane Smith',
    customerPhone: '+92 300 4444444',
    restaurantName: 'Burger King',
    restaurantAddress: '456 Block 6, Karachi',
    deliveryAddress: '789 Clifton, Karachi',
    orderItems: [
      { name: 'Whopper', quantity: 1, price: 8.99 },
      { name: 'French Fries', quantity: 1, price: 3.99 },
    ],
    totalAmount: 12.98,
    deliveryFee: 2.0,
    riderEarnings: 3.0,
    status: 'accepted',
    orderTime: '2024-01-15T11:15:00Z',
    estimatedDeliveryTime: '2024-01-15T11:45:00Z',
    riderId: '7',
    specialInstructions: 'Leave at front desk',
  },
  {
    id: 'order_3',
    customerName: 'Ali Hassan',
    customerPhone: '+92 300 7777777',
    restaurantName: 'Sushi Master',
    restaurantAddress: '789 Clifton, Karachi',
    deliveryAddress: '321 DHA, Karachi',
    orderItems: [
      { name: 'California Roll', quantity: 2, price: 15.99 },
      { name: 'Miso Soup', quantity: 1, price: 4.99 },
    ],
    totalAmount: 36.97,
    deliveryFee: 3.0,
    riderEarnings: 5.0,
    status: 'delivered',
    orderTime: '2024-01-15T09:00:00Z',
    estimatedDeliveryTime: '2024-01-15T09:30:00Z',
    actualDeliveryTime: '2024-01-15T09:25:00Z',
    riderId: '6',
    specialInstructions: 'Call when arrived',
  },
];

export const riderStats = {
  totalDeliveries: 156,
  totalEarnings: 485.5,
  averageRating: 4.7,
  totalDistance: 1250.5, // in km
  onlineHours: 8.5, // hours online today
  completedToday: 12,
  pendingOrders: 3,
};
