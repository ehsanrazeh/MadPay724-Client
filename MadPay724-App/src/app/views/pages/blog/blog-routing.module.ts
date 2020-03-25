import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BlogDirectoryComponent } from './pages/blog-directory/blog-directory.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';

const routes: Routes = [
    {
        path: 'directory',
        component: BlogDirectoryComponent,
        data: { title: ['مقالات مادپی 724'] }
    },
    {
        path: 'post',
        component: BlogPostComponent,
        data: { title: ['مقالات مادپی 724'] }
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }