import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogGroup } from 'src/app/models/blog/blogGroup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogGroupService {
  baseUrl = environment.apiUrl + environment.apiV1 + 'site/panel/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  blogGroupForm: FormGroup = this.formBuilder.group({
    // id: [],
    // parent: [true, [Validators.required]],
    // name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
  });
  getBlogGroups(id: string): Observable<BlogGroup[]> {
    return this.http.get<BlogGroup[]>(this.baseUrl + 'users/' + id + '/blogGroups');
  }
  getBlogGroup(id: string, blogGroupId: string): Observable<BlogGroup> {
    return this.http.get<BlogGroup>(this.baseUrl + 'users/' + id + '/blogGroups/' + blogGroupId);
  }
  addBlogGroup(blogGroup: any, id: string): Observable<BlogGroup> {
    return this.http.post<BlogGroup>(this.baseUrl + 'users/' + id + '/blogGroups', blogGroup);
  }

  updateBlogGroup(blogGroup: any, userId: string, id: string) {
    return this.http.put(this.baseUrl + 'users/' + userId + '/blogGroups/' + id, blogGroup);
  }

  populateForm(blogGroup: BlogGroup) {
    this.blogGroupForm.setValue(blogGroup);
  }
  deleteBlogGroup(userId: string, blogGroupId: string) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/blogGroups/' + blogGroupId);
  }
}
