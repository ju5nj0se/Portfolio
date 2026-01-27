import { Routes } from '@angular/router';
import { Contact } from './views/contact/contact';
import { Home } from './views/home/home';

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
