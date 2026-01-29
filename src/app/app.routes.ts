import { Routes } from '@angular/router';
import { Contact } from './presentation/views/contact/contact';
import { Home } from './presentation/views/home/home';

export const routes: Routes = [

    {
        path: 'contact',
        component: Contact
    },
    {
        path: '',
        component: Home 
    }
];
