import * as vscode from "vscode";
import * as DecorationOptions from "./DecorationHandler";

export default class ConfigHandler {
  constructor() {}

  private getConfiguration() {
    return vscode.workspace.getConfiguration("BracketHighlighter", null);
  }

  public highlightScopeFromText(): boolean {
    const config = this.getConfiguration();
    let highlightScopeFromText: boolean | undefined = config.get(
      "highlightScopeFromText"
    );
    if (highlightScopeFromText === undefined) {
      highlightScopeFromText = false;
    }
    return highlightScopeFromText;
  }

  public blurOutOfScopeText(): boolean {
    const config = this.getConfiguration();
    let blurOutOfScopeText: boolean | undefined = config.get(
      "blurOutOfScopeText"
    );
    if (blurOutOfScopeText === undefined) {
      blurOutOfScopeText = false;
    }
    return blurOutOfScopeText;
  }

  public getOpacity(): string {
    const config = this.getConfiguration();
    let opacity: string | undefined = config.get("blurOpacity");
    if (opacity === undefined) {
      opacity = "0.5";
    }
    return opacity;
  }

  public activeWhenDebugging(): boolean {
    const config = this.getConfiguration();
    let activeInDebug: boolean | undefined = config.get("activeInDebugMode");
    if (activeInDebug === undefined) {
      activeInDebug = true;
    }
    return activeInDebug;
  }

  public getMaxLineSearchCount(): number {
    const config = this.getConfiguration();
    let maxLineSearchCount: number | undefined = config.get(
      "maxLineSearchCount"
    );
    if (maxLineSearchCount === undefined) {
      maxLineSearchCount = 1000;
    }
    return maxLineSearchCount;
  }

  public getDecorationOptions(): DecorationOptions.DecorationOptions {
    const config = this.getConfiguration();
    let fontWeight: string | undefined = config.get("fontWeight");
    let fontStyle: string | undefined = config.get("fontStyle");
    let letterSpacing: string | undefined = config.get("letterSpacing");
    let outline: string | undefined = config.get("outline");
    let border: string | undefined = config.get("border");
    let backgroundColor: string | undefined = config.get("backgroundColor");
    let textDecoration: string | undefined = config.get("textDecoration");
    return new DecorationOptions.DecorationOptions(
      fontWeight,
      fontStyle,
      letterSpacing,
      outline,
      border,
      textDecoration,
      backgroundColor
    );
  }

  public getEnabledLanguages(): Array<string> {
    const config = this.getConfiguration();
    let allowedLanguageIdString: string | undefined = config.get(
      "allowedLanguageIds"
    );
    if (allowedLanguageIdString === undefined) {
      return [];
    }
    allowedLanguageIdString = allowedLanguageIdString.replace(/\s/g, "");
    let allowedLanguageIds: Array<string> = allowedLanguageIdString.split(",");
    return allowedLanguageIds;
  }

  public reverseSearchEnabled(): boolean {
    const config = this.getConfiguration();
    let reverseSearchEnabled: boolean | undefined = config.get(
      "reverseSearchEnabled"
    );
    if (reverseSearchEnabled === undefined) {
      reverseSearchEnabled = true;
    }
    return reverseSearchEnabled;
  }

  private getCustomSymbols(): {
    startSymbols: Array<string>;
    endSymbols: Array<string>;
  } {
    const config = this.getConfiguration();
    let customSymbols: any = config.get("customSymbols");
    if (customSymbols === undefined) {
      customSymbols = [{}];
    }
    let customStartSymbols: Array<string> = [];
    let customEndSymbols: Array<string> = [];
    for (let customSymbol of customSymbols) {
      if (
        customSymbol.hasOwnProperty("open") &&
        customSymbol.hasOwnProperty("close")
      ) {
        if (customSymbol.open !== customSymbol.close) {
          customStartSymbols.push(customSymbol.open);
          customEndSymbols.push(customSymbol.close);
        }
      }
    }
    return {
      startSymbols: customStartSymbols,
      endSymbols: customEndSymbols,
    };
  }

  public getAllowedStartSymbols(): Array<string> {
    const config = this.getConfiguration();
    let validStartSymbols: Array<string> = [];
    let useForSymbols: boolean | undefined;
    useForSymbols = config.get("useParentheses");
    if (useForSymbols === true) {
      validStartSymbols.push("(");
    }
    useForSymbols = config.get("useBraces");
    if (useForSymbols === true) {
      validStartSymbols.push("{");
    }
    useForSymbols = config.get("useBrackets");
    if (useForSymbols === true) {
      validStartSymbols.push("[");
    }
    useForSymbols = config.get("useAngularBrackets");
    if (useForSymbols === true) {
      validStartSymbols.push("<");
    }
    validStartSymbols = validStartSymbols.concat(
      this.getCustomSymbols().startSymbols
    );
    return validStartSymbols;
  }

  public getAllowedEndSymbols(): Array<string> {
    const config = this.getConfiguration();
    let validEndSymbols: Array<string> = [];
    let useForSymbols: boolean | undefined;
    useForSymbols = config.get("useParentheses");
    if (useForSymbols === true) {
      validEndSymbols.push(")");
    }
    useForSymbols = config.get("useBraces");
    if (useForSymbols === true) {
      validEndSymbols.push("}");
    }
    useForSymbols = config.get("useBrackets");
    if (useForSymbols === true) {
      validEndSymbols.push("]");
    }
    useForSymbols = config.get("useAngularBrackets");
    if (useForSymbols === true) {
      validEndSymbols.push(">");
    }
    validEndSymbols = validEndSymbols.concat(
      this.getCustomSymbols().endSymbols
    );
    return validEndSymbols;
  }

  public isExtensionEnabled(): boolean {
    const config = this.getConfiguration();
    let extensionEnabled: boolean | undefined = config.get("enableExtension");
    if (extensionEnabled === undefined) {
      extensionEnabled = true;
    }
    return extensionEnabled;
  }

  public setExtensionEnabledStatus(extensionEnabled: boolean) {
    let config = this.getConfiguration();
    config.update("enableExtension", extensionEnabled);
  }

  public getTimeOutValue(): number {
    let config = this.getConfiguration();
    let timeOutValue: number | undefined = config.get("timeOutValue");
    if (timeOutValue === undefined) {
      timeOutValue = 600;
    }
    return timeOutValue;
  }

  public ignoreContent(): boolean {
    let config = this.getConfiguration();
    let ignoreContent: boolean | undefined = config.get("ignoreContent");
    if (ignoreContent === undefined) {
      ignoreContent = false;
    }
    return ignoreContent;
  }

  public getTransitionTimeValue(): number {
    let config = this.getConfiguration();
    let transitionTime: number | undefined = config.get("transitionTime");
    if (transitionTime === undefined) {
      transitionTime = 0;
    }
    return transitionTime;
  }
}

export { ConfigHandler };
