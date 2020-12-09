import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // *) implementing the lazy loading
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then(module => module.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        module => module.ShoppingListModule
      )
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./not-found/not-found.module').then(
        module => module.NotFoundModule
      )
  },
  // at the end: 404 page - normal implementation
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full' // better to add this
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
