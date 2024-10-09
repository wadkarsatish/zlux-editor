import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  standalone: true,
  selector: 'include-external-css',
  template: `<ng-content></ng-content>`,
  styleUrls: [
    "../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
    "../../node_modules/material-icons/iconfont/material-icons.scss",
    "../../node_modules/monaco-editor/min/vs/editor/editor.main.css",
    "../styles/global.css",
    "../styles.scss"
  ],
  encapsulation: ViewEncapsulation.None
})
export class IncludeExternalCssComponent {
  // No index.html files at prod level to import the css. Plugin will be rendered inside zowe and accessed by appmodule and appcomponent so index.html will not be in picture
  // ViewEncapsulation.None will make sure to keep the css as it is. Will not scoped out
  // Mentioned in the component so will be a part of main.js
}