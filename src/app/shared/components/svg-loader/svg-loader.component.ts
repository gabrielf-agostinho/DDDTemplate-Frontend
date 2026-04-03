import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-svg-loader',
  template: ''
})
export class SvgLoaderComponent implements OnInit {
  @Input({ required: true })
  public src!: string;

  constructor(
    private http: HttpClient,
    private el: ElementRef
  ) { }

  public ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.http
      .get(`${this.src}`, { responseType: 'text' })
      .subscribe(svg => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');
        
        if (svgElement) {
          const hostClasses = this.el.nativeElement.className;
          svgElement.setAttribute('class', hostClasses);

          this.el.nativeElement.innerHTML = '';
          this.el.nativeElement.appendChild(svgElement);
        }
      });
  }
}