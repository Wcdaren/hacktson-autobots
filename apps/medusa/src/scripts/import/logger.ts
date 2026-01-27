import chalk from 'chalk';
import { writeFileSync, appendFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

/**
 * Logger class for colored console output and file logging
 */
export class Logger {
  private logFile: string;
  private verbose: boolean;
  
  constructor(verbose: boolean = false) {
    this.verbose = verbose;
    
    // Create logs directory if it doesn't exist
    const logsDir = join(__dirname, '..', 'logs');
    if (!existsSync(logsDir)) {
      mkdirSync(logsDir, { recursive: true });
    }
    
    this.logFile = join(logsDir, `import-${Date.now()}.log`);
  }
  
  success(message: string) {
    console.log(chalk.green('✓'), message);
    this.writeToFile(`[SUCCESS] ${message}`);
  }
  
  warning(message: string) {
    console.log(chalk.yellow('⚠'), message);
    this.writeToFile(`[WARNING] ${message}`);
  }
  
  error(message: string, error?: Error) {
    console.log(chalk.red('✗'), message);
    this.writeToFile(`[ERROR] ${message}`);
    if (error && this.verbose) {
      console.error(chalk.red(error.stack));
      this.writeToFile(error.stack || '');
    }
  }
  
  info(message: string) {
    console.log(chalk.blue('ℹ'), message);
    this.writeToFile(`[INFO] ${message}`);
  }
  
  debug(message: string, data?: any) {
    if (this.verbose) {
      console.log(chalk.gray('→'), message);
      if (data) {
        console.log(chalk.gray(JSON.stringify(data, null, 2)));
      }
    }
    this.writeToFile(`[DEBUG] ${message}`);
    if (data) {
      this.writeToFile(JSON.stringify(data, null, 2));
    }
  }
  
  progress(current: number, total: number, message: string) {
    const percentage = Math.round((current / total) * 100);
    const barLength = 50;
    const filledLength = Math.floor(percentage / 2);
    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
    process.stdout.write(`\r${chalk.cyan(bar)} ${percentage}% ${message}`);
  }
  
  private writeToFile(message: string) {
    const timestamp = new Date().toISOString();
    try {
      appendFileSync(this.logFile, `${timestamp} ${message}\n`);
    } catch (error) {
      // Silently fail if we can't write to log file
    }
  }
  
  getLogFile(): string {
    return this.logFile;
  }
}
