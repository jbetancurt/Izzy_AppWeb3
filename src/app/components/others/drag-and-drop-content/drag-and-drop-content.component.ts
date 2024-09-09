import { Component } from '@angular/core';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-and-drop-content',
  templateUrl: './drag-and-drop-content.component.html',
  styleUrls: ['./drag-and-drop-content.component.scss'],
  standalone: true,
  imports: [CdkDrag, CdkDragHandle],
})
export class DragAndDropContentComponent {

}
