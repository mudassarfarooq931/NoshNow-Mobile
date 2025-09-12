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
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
