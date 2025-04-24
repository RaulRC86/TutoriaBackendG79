import request from 'supertest';
import app from '../index.js';
import { db } from '../db/database.js';



jest.mock('../db/database.js', () => ({
    db: {
        query: jest.fn(),
    }
}));

describe('GET /api/clients', () => {
    it('should return status code 200 and a list of users', async () => {
        const mockUsers = [
            { id: 1, nombre: 'John Doe', email: 'jV7d3@example.com', password: 'password123' }
        ];
        db.query.mockResolvedValueOnce({ rows: mockUsers });
      const response = await request(app).get('/api/clients')
       expect(response.status).toBe(200)
       expect(response.body).toEqual(mockUsers);
    });
  });
  