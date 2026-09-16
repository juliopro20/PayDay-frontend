import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';
import { Faq } from './pages/faq/faq';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'about', component: About},
    { path: 'contact', component: Contact},
    { path: 'faq', component: Faq},
];
