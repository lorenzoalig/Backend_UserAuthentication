import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    // Get all users
    getUsers(): string[] {
        return ['0','1'];
    };

    // Get a single user
    getUser(): string {
        return '0';
    }

    // Create a user
    createUser(): void {
    }

    // Update an user
    updateUser(): string {
        return '0';
    }

    // Delete an user
    deleteUser(): boolean {
        return true;
    }
}
