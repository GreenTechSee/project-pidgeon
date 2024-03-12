import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TopbarComponent } from './topbar.component';
import { render, screen, fireEvent, getByRole } from '@testing-library/angular';

describe('TopbarComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  it('should render logo image', async () => {
    await render(TopbarComponent);
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeTruthy();
    expect(logoImage.getAttribute('src')).toContain('../../../assets/images/blocks/logos/secmap_256_webclip.png');
  });

  it('should show support info', async () => {
    await render(TopbarComponent);
    expect(screen.getByText('Support'));
  });

  it('should show submenu when hovering over support button', async () => {
    await render(TopbarComponent);
    const menu = getByRole(document.body, 'menubar');
    const supportButton = menu.children[1] as HTMLElement;

    fireEvent.mouseEnter(supportButton);
    expect(screen.getByText('(+47) 973 01 375'));
    expect(screen.getByText('support@secmap.no'));
  });
});
