import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgZone } from '@angular/core';

import { AppModule } from './app/app.module';

import { auguryBootstrap } from '@augury/core';
import { PerformanceProfilerPlugin } from '@augury/performance-profiler-plugin';

auguryBootstrap({
  platform: platformBrowserDynamic,
  ngModule: AppModule,
  NgZone,
  plugins: [new PerformanceProfilerPlugin()],
});
