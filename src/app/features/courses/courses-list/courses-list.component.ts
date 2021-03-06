import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Course } from '../shared/interfaces/course.interface';

import { CoursesFilterPipe } from './courses-item-filter.pipe';
import { CoursesService } from '../shared/services/courses.service';

@Component({
  selector: 'courses-list',
  styleUrls: [ './courses-list.component.scss' ],
  templateUrl: './courses-list.template.html',
  providers: [ CoursesFilterPipe ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CoursesListComponent implements OnInit, OnChanges {
  @Input() filterBy:string;

  public courses: Course[];
  public raw: Course[];

  constructor(private coursesService: CoursesService,
              private coursesFilterPipe: CoursesFilterPipe,
              private cd: ChangeDetectorRef) { }

  ngOnChanges() {
    this.courses = this.coursesFilterPipe.transform(this.raw, this.filterBy);
  }

  public ngOnInit() {
    this.coursesService.courses.subscribe((courses: Course[]) => {
      this.courses = courses;
      this.raw = this.courses;
      console.log('subscribe')
      this.cd.markForCheck();
    });
  }
}
