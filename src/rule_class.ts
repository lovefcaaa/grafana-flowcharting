import grafana from 'grafana_func';
import State from './state_class';
import _ from 'lodash';
import Metric from 'metric_class';

/**
 * Rule definition
 *
 * @export
 * @class Rule
 */
export default class Rule {
  data: gf.TIRuleData;
  shapeMaps: ShapeMap[] = [];
  textMaps: TextMap[] = [];
  linkMaps: LinkMap[] = [];
  valueMaps: ValueMap[] = [];
  rangeMaps: RangeMap[] = [];
  id: string;
  removeClick = 2;
  states: Map<string, State>;
  highestLevel = -1;
  highestColor = '';
  highestFormattedValue = '';

  /**
   * Creates an instance of Rule.
   * @param {string} pattern
   * @param {TIRuleData} data
   * @memberof Rule
   */
  constructor(pattern: string, data: gf.TIRuleData) {
    this.data = data;
    this.data.pattern = pattern;
    this.id = GFP.utils.uniqueID();
    this.states = new Map();
  }

  /**
   * Get default data
   *
   * @static
   * @returns {gf.TIRuleData}
   * @memberof Rule
   */
  static getDefaultData(): gf.TIRuleData {
    return {
      order: 1,
      pattern: '.*',
      unit: 'short',
      type: 'number',
      metricType: 'serie',
      alias: 'myRule',
      refId: 'A',
      column: 'Time',
      hidden: false,
      aggregation: 'current',
      decimals: 2,
      colors: ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'],
      reduce: true,
      //style: 'fillColor',
      //colorOn: 'a',
      //link: false,
      //linkOn: 'a',
      //linkUrl: '',
      //linkParams: false,
      //textOn: 'wmd',
      //textReplace: 'content',
      //textPattern: '/.*/',
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      thresholds: [50, 80],
      stringThresholds: ['/.*/', '/.*/'],
      //stringWarning: '',
      //stringCritical: '',
      invert: false,
      gradient: false,
      overlayIcon: false,
      tooltip: false,
      tooltipLabel: '',
      tooltipColors: false,
      tooltipOn: 'a',
      tpDirection: 'v',
      tpGraph: false,
      tpGraphSize: '100%',
      tpGraphType: 'line',
      tpGraphLow: null,
      tpGraphHigh: null,
      tpGraphScale: 'linear',
      shapeProp: 'id',
      shapeData: [],
      textProp: 'id',
      textData: [],
      linkProp: 'id',
      linkData: [],
      mappingType: 1,
      valueData: [],
      rangeData: [],
      sanitize: false,
    };
  }

  /**
   * return data of rule
   *
   * @returns {data}
   * @memberof Rule
   */
  getData(): gf.TIRuleData {
    return this.data;
  }

  /**
   * import data in rule
   *
   * @returns {this}
   * @param {data} obj
   * @memberof Rule
   */
  import(obj: any): this {
    if (!!obj.unit) {
      this.data.unit = obj.unit;
    }
    if (!!obj.type) {
      this.data.type = obj.type;
    }
    if (!!obj.metricType) {
      this.data.metricType = obj.metricType;
    }
    if (!!obj.alias) {
      this.data.alias = obj.alias;
    }
    if (!!obj.refId) {
      this.data.refId = obj.refId;
    }
    if (!!obj.column) {
      this.data.column = obj.column;
    }
    if (!!obj.aggregation) {
      this.data.aggregation = obj.aggregation;
    }
    if (!!obj.decimals || obj.decimals === 0) {
      this.data.decimals = obj.decimals;
    }
    if (!!obj.colors) {
      this.data.colors = obj.colors.slice(0);
    }
    if (!!this.data.reduce) {
      this.data.reduce = true;
    }

    // 0.7.0
    let colorOn: gf.TColorOn | undefined = undefined;
    if (!!obj.colorOn) {
      colorOn = obj.colorOn;
    }

    // 0.7.0
    let style: gf.TStyleKey | undefined = undefined;
    if (!!obj.style) {
      style = obj.style;
    }

    // 0.7.0
    let link = false;
    let linkUrl: string | undefined = undefined;
    let linkParams: boolean | undefined = undefined;
    if (!!obj.link) {
      link = obj.link;
    }
    if (!!obj.linkUrl) {
      linkUrl = obj.linkUrl;
    }
    if (!!obj.linkParams) {
      linkParams = obj.linkParams;
    }

    // 0.7.0
    let linkOn: gf.TLinkOn | undefined = undefined;
    if (!!obj.linkOn) {
      linkOn = obj.linkOn;
    }

    // 0.7.0
    let textOn: gf.TTextOn | undefined = undefined;
    if (!!obj.textOn) {
      textOn = obj.textOn;
    }

    // 0.7.0
    let textReplace: gf.TTextReplace | undefined = undefined;
    let textPattern: string | undefined = undefined;
    if (!!obj.textReplace) {
      textReplace = obj.textReplace;
    }
    if (!!obj.textPattern) {
      textPattern = obj.textPattern;
    }
    if (!!obj.pattern) {
      this.data.pattern = obj.pattern;
    }
    if (!!obj.dateFormat) {
      this.data.dateFormat = obj.dateFormat;
    }
    if (!!obj.thresholds) {
      this.data.thresholds = obj.thresholds.map((x: any) => {
        let value = x;
        if (typeof value === 'string') {
          value = parseFloat(value);
        }
        return value;
      });
      // this.data.thresholds = obj.thresholds.slice(0);
    }

    if (!!obj.stringThresholds) {
      this.data.stringThresholds = obj.stringThresholds.slice(0);
    }

    if (!!obj.stringWarning) {
      //this.data.stringWarning = obj.stringWarning;
      this.data.stringThresholds[1] = obj.stringWarning;
    }
    if (!!obj.stringCritical) {
      //this.data.stringCritical = obj.stringCritical;
      this.data.stringThresholds[0] = obj.stringCritical;
    }

    if (!!obj.invert || obj.invert === false) {
      this.data.invert = obj.invert;
    }

    if (!!obj.gradient || obj.gradient === false) {
      this.data.gradient = obj.gradient;
    }

    if (!!obj.overlayIcon || obj.overlayIcon === false) {
      this.data.overlayIcon = obj.overlayIcon;
    }
    if (!!obj.tooltip || obj.tooltip === false) {
      this.data.tooltip = obj.tooltip;
    }
    if (!!obj.tooltipLabel) {
      this.data.tooltipLabel = obj.tooltipLabel;
    }
    if (!!obj.tooltipColors || obj.tooltipColors === false) {
      this.data.tooltipColors = obj.tooltipColors;
    }
    if (!!obj.tooltipOn) {
      this.data.tooltipOn = obj.tooltipOn;
    }
    if (!!obj.tpDirection) {
      this.data.tpDirection = obj.tpDirection;
    }
    if (!!obj.tpGraph || this.data.tpGraph === false) {
      this.data.tpGraph = obj.tpGraph !== undefined;
    }
    if (!!obj.tpGraphSize) {
      this.data.tpGraphSize = obj.tpGraphSize;
    }
    if (!!obj.tpGraphType) {
      this.data.tpGraphType = obj.tpGraphType;
    }
    if (!!obj.tpGraphLow || obj.tpGraphLow === 0) {
      this.data.tpGraphLow = obj.tpGraphLow;
    }
    if (!!obj.tpGraphHigh || obj.tpGraphHigh === 0) {
      this.data.tpGraphHigh = obj.tpGraphHigh;
    }
    if (!!obj.tpGraphScale) {
      this.data.tpGraphScale = obj.tpGraphScale;
    }
    let maps: any = [];

    // SHAPES
    if (!!obj.shapeProp) {
      this.data.shapeProp = obj.shapeProp;
    }
    this.data.shapeData = [];

    // For 0.2.0
    maps = [];
    if (obj.shapeMaps !== undefined && obj.shapeMaps !== null && obj.shapeMaps.length > 0) {
      maps = obj.shapeMaps;
    } else {
      maps = obj.shapeData;
    }

    if (maps !== undefined && maps !== null && maps.length > 0) {
      maps.forEach((shapeData: gf.TShapeMapData) => {
        // 0.7.0
        if (!!style) {
          shapeData.style = style;
        }

        // 0.7.0
        if (!!colorOn) {
          shapeData.colorOn = colorOn;
        }
        this.addShapeMap('').import(shapeData);
      });
    }

    // TEXT
    this.data.textProp = obj.textProp || 'id';
    this.data.textData = [];
    // For 0.2.0
    maps = [];
    if (obj.shapeMaps !== undefined && obj.shapeMaps !== null && obj.shapeMaps.length > 0) {
      maps = obj.textMaps;
    } else {
      maps = obj.textData;
    }

    if (maps !== undefined && maps != null && maps.length > 0) {
      maps.forEach((textData: gf.TTextMapData) => {
        // 0.7.0
        if (!!textReplace) {
          textData.textReplace = textReplace;
        }
        if (!!textPattern) {
          textData.textPattern = textPattern;
        }
        if (!!textOn) {
          textData.textOn = textOn;
        }

        this.addTextMap('').import(textData);
      });
    }

    // LINK
    this.data.linkProp = obj.linkProp || 'id';
    this.data.linkData = [];
    if (obj.linkData !== undefined && obj.linkData != null && obj.linkData.length > 0) {
      obj.linkData.forEach((linkData: gf.TlinkMapData) => {
        // 0.7.0
        if (!!linkUrl && link) {
          linkData.linkUrl = linkUrl;
        }
        if (!!linkParams && link) {
          linkData.linkParams = linkParams;
        }
        if (!!linkOn) {
          linkData.linkOn = linkOn;
        }
        this.addLinkMap('').import(linkData);
      });
    }

    this.data.mappingType = obj.mappingType || 1;

    // VALUES
    this.data.valueData = [];
    if (obj.valueData !== undefined && obj.valueData != null && obj.valueData.length > 0) {
      obj.valueData.forEach((valueData: gf.TValueMapData) => {
        this.addValueMap('', '').import(valueData);
      });
    }

    // RANGE
    this.data.rangeData = [];
    if (obj.rangeData !== undefined && obj.rangeData != null && obj.rangeData.length > 0) {
      obj.rangeData.forEach(rangeData => {
        this.addRangeMap('', '', '').import(rangeData);
      });
    }
    this.data.sanitize = obj.sanitize || false;
    return this;
  }

  /**
   * Return uniq id of rule
   *
   * @returns
   * @memberof Rule
   */
  getId(): string {
    return this.id;
  }

  /**
   * Highlight Cells in rule (mapping color text and link)
   *
   * @memberof Rule
   */
  highlightCells() {
    if (this.states) {
      this.states.forEach(state => {
        state.highlightCell();
      });
    }
  }

  /**
   * Highlight Cells in rule (mapping color text and link)
   *
   * @memberof Rule
   */
  unhighlightCells() {
    if (this.states) {
      this.states.forEach(state => {
        state.unhighlightCell();
      });
    }
  }

  /**
   * Return the order of this rule
   * Grafana 6+ have a bug when reload dashboad, array are not in order
   *
   * @param {number} order
   * @memberof Rule
   */
  setOrder(order: number) {
    this.data.order = order;
  }

  /**
   * Return order of rule
   *
   * @memberof Rule
   */
  getOrder(): number {
    return this.data.order;
  }

  isHidden(): boolean {
    return this.data.hidden;
  }

  hide(): this {
    this.data.hidden = true;
    return this;
  }

  show(): this {
    this.data.hidden = false;
    return this;
  }

  /**
   * Invert color order
   *
   * @returns {this}
   * @memberof Rule
   */
  invertColorOrder(): this {
    // const ref = this.data.colors;
    // const copy = ref[0];
    // ref[0] = ref[2];
    // ref[2] = copy;
    this.data.colors.reverse();
    // this.data.invert = !this.data.invert;
    // if (this.data.invert) {
    //   this.data.invert = false;
    // } else {
    //   this.data.invert = true;
    // }
    return this;
  }

  /**
   *
   *
   * @param {number} index
   * @returns {this}
   * @memberof Rule
   */
  addColor(index: number): this {
    const thresholds = this.data.thresholds;
    const colors = this.data.colors;
    const colorStart: string = colors[index];
    let color: string;
    let value: any;
    if (index !== colors.length - 1) {
      let ratio = 0.5;
      let colorEnd = colors[index + 1];
      color = GFP.utils.getRatioColor(ratio, colorStart, colorEnd);
      if (this.data.type === 'number') {
        let absoluteDistance = thresholds[index] - thresholds[index - 1];
        value = absoluteDistance / 2 + thresholds[index - 1];
      } else {
        value = this.data.stringThresholds[index - 1];
      }
    } else {
      color = colorStart;
    }
    this.data.colors.splice(index + 1, 0, color);
    if (this.data.type === 'number') {
      this.data.thresholds.splice(index, 0, value);
    } else if (this.data.type === 'string') {
      this.data.stringThresholds.splice(index, 0, value);
    }
    GFP.log.debug('this', this);
    return this;
  }

  /**
   *
   *
   * @param {number} index
   * @returns {this}
   * @memberof Rule
   */
  removeColor(index: number): this {
    // if (index !== 0) {
    this.data.thresholds.splice(index - 1, 1);
    this.data.colors.splice(index, 1);
    // }
    GFP.log.debug('this', this);
    return this;
  }

  /**
   * Return a color
   *
   * @param {number} index
   * @returns {string} html color
   * @memberof Rule
   */
  getColor(index: number): string {
    return this.data.colors[index];
  }

  /**
   * Return Array of html colors
   *
   * @returns {string[]}
   * @memberof Rule
   */
  getColors(): string[] {
    return this.data.colors;
  }

  /**
   * Return number of colors
   *
   * @returns {number}
   * @memberof Rule
   */
  getColorsCount(): number {
    return this.data.colors.length;
  }

  //
  // Conditions
  //

  /**
   * Return true or false for condition to colorize
   *
   * @param {number} level
   * @returns {boolean}
   * @memberof Rule
   * 0.7.0 : Moved to shapeMap
   */
  // toColorize(level: number): boolean {
  //   if (level === -1) {
  //     return false;
  //   }
  //   if (this.data.colorOn === 'n') {
  //     return false;
  //   }
  //   if (this.data.colorOn === 'a') {
  //     return true;
  //   }
  //   if (this.data.colorOn === 'wc' && level >= 1) {
  //     return true;
  //   }
  //   return false;
  // }

  /**
   * Return true or false for condition to change label
   *
   * @param {number} level
   * @returns {boolean}
   * @memberof Rule
   */
  // 0.7.0 Moved to textMap
  // toLabelize(level: number): boolean {
  //   // if (this.data.textOn === 'wmd' && level > 0) return true;
  //   // if (this.data.textOn === 'wmd' && level === -1) return false;
  //   if (this.data.textOn === 'wmd') {
  //     return true;
  //   }
  //   if (this.data.textOn === 'n') {
  //     return false;
  //   }
  //   if (this.data.textOn === 'wc' && level >= 1) {
  //     return true;
  //   }
  //   if (this.data.textOn === 'co' && level >= 2) {
  //     return true;
  //   }
  //   return false;
  // }

  /**
   * Return true or false for condition to display icon warning
   *
   * @param {level} level
   * @returns {boolean}
   * @memberof Rule
   */
  toIconize(level: number): boolean {
    if (this.data.overlayIcon === false) {
      return false;
    }
    if (this.data.overlayIcon === true && level >= 1) {
      return true;
    }
    return false;
  }

  /**
   * Return true or false for condition to add/replace link
   *
   * @param {number} level
   * @returns {boolean}
   * @memberof Rule
   */
  // 0.7.0 : Moved to LinkMap
  // toLinkable(level: number): boolean {
  //   if (this.data.linkOn === 'a') {
  //     return true;
  //   }
  //   if (this.data.linkOn === 'wc' && level >= 1) {
  //     return true;
  //   }
  //   return false;
  // }

  /**
   * Return true or false for condition to display tooltip with values
   *
   * @param {number} level
   * @returns
   * @memberof Rule
   */
  toTooltipize(level: number): boolean {
    if (this.data.tooltip === false) {
      return false;
    }
    if (this.data.tooltipOn === 'a') {
      return true;
    }
    if (this.data.tooltipOn === 'wc' && level >= 1) {
      return true;
    }
    return false;
  }

  //
  // Series|Tables
  //
  /**
   * Return boolean if metrics is matched by rule
   *
   * @param {Metric} metric
   * @returns {boolean}
   * @memberof Rule
   */
  matchMetric(metric: Metric): boolean {
    if (this.data.metricType === 'serie' && metric.type === 'serie') {
      return GFP.utils.matchString(metric.getName(), this.data.pattern);
    }
    if (this.data.metricType === 'table' && metric.type === 'table') {
      return metric.getName() === this.data.refId;
    }
    return false;
  }

  //
  // SHAPE MAPS
  //
  /**
   * Add new shape for rule
   *
   * @param {string} pattern
   * @memberof Rule
   */
  addShapeMap(pattern: string): ShapeMap {
    const data = ShapeMap.getDefaultData();
    const m = new ShapeMap(pattern, data);
    this.shapeMaps.push(m);
    this.data.shapeData.push(data);
    return m;
  }

  /**
   * Remove shape for rule
   *
   * @returns {this}
   * @param {number} index
   * @memberof Rule
   */
  removeShapeMap(index: number): this {
    this.data.shapeData.splice(index, 1);
    this.shapeMaps.splice(index, 1);
    return this;
  }

  /**
   * Return shape objet in index position
   *
   * @param {number} index
   * @returns {ShapeMap}
   * @memberof Rule
   */
  getShapeMap(index: number): ShapeMap {
    return this.shapeMaps[index];
  }

  /**
   * Return all ShapeMaps
   *
   * @returns {Array<ShapeMap>}
   * @memberof Rule
   */
  getShapeMaps(): ShapeMap[] {
    return this.shapeMaps;
  }

  /**
   * Return bool if shape name (value|id) is in rule
   *
   * @param {string} pattern
   * @returns {boolean}
   * @memberof Rule
   */
  matchShape(pattern: string | null): boolean {
    let found = false;
    this.shapeMaps.forEach(element => {
      if (element.match(pattern)) {
        found = true;
      }
    });
    return found;
  }

  //
  // TEXT MAPS
  //
  addTextMap(pattern: string): TextMap {
    const data = TextMap.getDefaultData();
    const m = new TextMap(pattern, data);
    // m.import(data);
    this.textMaps.push(m);
    this.data.textData.push(data);
    return m;
  }

  removeTextMap(index: number) {
    this.data.textData.splice(index, 1);
    this.textMaps.splice(index, 1);
  }

  getTextMap(index: number): TextMap {
    return this.textMaps[index];
  }

  getTextMaps(): TextMap[] {
    return this.textMaps;
  }

  matchText(pattern: string | null): boolean {
    let found = false;
    this.textMaps.forEach(element => {
      if (element.match(pattern)) {
        found = true;
      }
    });
    return found;
  }

  //
  // LINK MAPS
  //
  addLinkMap(pattern: string): LinkMap {
    GFP.log.info('Rule.addLinkMap()');
    const data = LinkMap.getDefaultData();
    const m = new LinkMap(pattern, data);
    m.import(data);
    this.linkMaps.push(m);
    this.data.linkData.push(data);
    return m;
  }

  removeLinkMap(index: number) {
    this.data.linkData.splice(index, 1);
    this.linkMaps.splice(index, 1);
  }

  getLinkMap(index: number): LinkMap {
    return this.linkMaps[index];
  }

  getLinkMaps(): LinkMap[] {
    return this.linkMaps;
  }

  matchLink(pattern: string | null): boolean {
    let found = false;
    this.linkMaps.forEach(element => {
      if (element.match(pattern)) {
        found = true;
      }
    });
    return found;
  }

  //
  // STRING VALUE MAPS
  //
  addValueMap(value: string, text: string): ValueMap {
    const data: gf.TValueMapData = ValueMap.getDefaultdata();
    const m = new ValueMap(value, text, data);
    this.valueMaps.push(m);
    this.data.valueData.push(data);
    return m;
  }

  removeValueMap(index) {
    this.data.valueData.splice(index, 1);
    this.valueMaps.splice(index, 1);
  }

  getValueMap(index): ValueMap {
    return this.valueMaps[index];
  }

  getValueMaps(): ValueMap[] {
    return this.valueMaps;
  }

  //
  // STRING RANGE VALUE MAPS
  //
  addRangeMap(from, to, text): RangeMap {
    const data = RangeMap.getDefaultData();
    const m = new RangeMap(from, to, text, data);
    this.rangeMaps.push(m);
    this.data.rangeData.push(data);
    return m;
  }

  removeRangeMap(index) {
    this.data.rangeData.splice(index, 1);
    this.rangeMaps.splice(index, 1);
  }

  getRangeMap(index): RangeMap {
    return this.rangeMaps[index];
  }

  getRangeMaps(): RangeMap[] {
    return this.rangeMaps;
  }

  hideRangeMap(index): this {
    this.rangeMaps[index].hide();
    return this;
  }

  showRangeMap(index): this {
    this.rangeMaps[index].show();
    return this;
  }

  //
  // Format value
  //
  /**
   * Get color according to value
   *
   * @param {number} value
   * @returns {string} html color
   * @memberof Rule
   */
  getColorForValue(value: any): string {
    if (!this.data.gradient || this.data.type !== 'number') {
      let level = this.getThresholdLevel(value);
      return this.getColorForLevel(level);
    }
    if (this.data.type === 'number') {
      const thresholds = this.data.thresholds;
      const colors = this.data.colors;
      let l = thresholds.length;
      // No Thresholds
      if (thresholds === undefined || l === 0) {
        return colors[0];
      }

      let cursor = 0;
      for (let index = 0; index < l; index++) {
        const t = thresholds[index];
        if (value < t) {
          break;
        }
        cursor = index;
      }
      // value Lower than min level
      if (cursor === 0 && value <= thresholds[0]) {
        return colors[0];
      }
      // value upper then max level
      if (cursor === l - 1) {
        return colors[cursor + 1];
      }
      // Or
      let absoluteDistance = thresholds[cursor + 1] - thresholds[cursor];
      let valueDistanceFromMin = value - thresholds[cursor];
      let ratio = valueDistanceFromMin / absoluteDistance;
      let color = GFP.utils.getRatioColor(ratio, colors[cursor + 1], colors[cursor + 2]);
      return color;
    }
    return '';
  }

  /**
   * Get color according level (-1,0,1,2)
   *
   * @param {*} level
   * @returns
   * @memberof Rule
   */
  getColorForLevel(level: number): string {
    GFP.log.debug('getColorForLevel level', level);
    let colors = this.data.colors.slice(0);
    if (!this.data.invert) {
      colors = colors.reverse();
    }
    if (level <= 0) {
      return colors[0];
    } else if (colors[level] !== undefined) {
      return colors[level];
    }
    return colors[0];
  }

  /**
   * Return Level according to value and rule options
   *
   * @param {number} value
   * @returns 0, 1 or 2
   * @memberof Rule
   */
  getThresholdLevel(value: any): number {
    // NUMBER
    if (this.data.type === 'number') {
      let thresholdLevel = 0;
      let thresholds = this.data.thresholds;

      if (thresholds === undefined || thresholds.length === 0) {
        return 0;
      }

      let l = thresholds.length;
      for (let index = 0; index < l; index++) {
        const t = thresholds[index];
        if (value < t) {
          break;
        }
        thresholdLevel = index + 1;
      }

      if (!this.data.invert) {
        thresholdLevel = l - thresholdLevel;
      }
      return thresholdLevel;
    }
    // STRING
    if (this.data.type === 'string') {
      let thresholdLevel = 0;
      let thresholds = this.data.stringThresholds;
      if (thresholds === undefined || thresholds.length === 0) {
        return -1;
      }
      let l = thresholds.length;
      for (let index = 0; index < l; index++) {
        const t = thresholds[index];
        if (GFP.utils.matchString(value, t)) {
          thresholdLevel = index + 1;
          break;
        }
      }

      if (!this.data.invert) {
        thresholdLevel = l - thresholdLevel;
      }
      return thresholdLevel;
    }
    return 0;
  }

  /**
   * Get value for this metric
   *
   * @param {Metric} metric
   * @returns {(string | number | null)}
   * @memberof Rule
   */
  getValueForMetric(metric: Metric): string | number | null {
    if (this.matchMetric(metric)) {
      try {
        const value = metric.getValue(this.data.aggregation, this.data.column);
        return value;
      } catch (error) {
        GFP.log.error('datapoint for metric is null', error);
        return null;
      }
    }
    return '-';
  }

  /**
   * Get formatting value according unit
   *
   * @param {Metric} metric
   * @returns {string}
   * @memberof Rule
   */
  getFormattedValueForMetric(metric: Metric): string {
    const formattedValue = this.getValueForMetric(metric);
    return this.getFormattedValue(formattedValue);
  }

  /**
   * Format a one value according rule
   *
   * @param {*} value
   * @returns
   * @memberof Rule
   */
  getFormattedValue(value: any) {
    // Number
    if (this.data.type === 'number') {
      if (!_.isFinite(value)) {
        return 'Invalid Number';
      }
      if (value === null || value === void 0) {
        return '-';
      }
      let decimals = this.decimalPlaces(value);
      decimals = typeof this.data.decimals === 'number' ? Math.min(this.data.decimals, decimals) : decimals;
      return grafana.formatValue(value, this.data.unit, this.data.decimals);
    }

    if (this.data.type === 'string') {
      if (value === null || value === void 0) {
        value = 'null';
      }

      if (_.isArray(value)) {
        value = value.join(', ');
      }
      const mappingType = this.data.mappingType || 0;
      if (mappingType === 1 && this.valueMaps) {
        for (let i = 0; i < this.valueMaps.length; i += 1) {
          const map = this.valueMaps[i];
          if (map.match(value)) {
            return map.getFormattedText(value);
          }
        }
        return value.toString();
      }

      if (mappingType === 2 && this.rangeMaps) {
        for (let i = 0; i < this.rangeMaps.length; i += 1) {
          const map = this.rangeMaps[i];
          if (map.match(value)) {
            return map.getFormattedText(value);
          }
        }
        return value.toString();
      }

      if (value === null || value === void 0) {
        return 'null';
      }
    }

    if (this.data.type === 'date') {
      if (value === undefined || value === null) {
        return '-';
      }

      if (_.isArray(value)) {
        value = value[0];
      }
      // const date = moment(value);
      // if (this.dashboard.isTimezoneUtc()) {
      //     date = date.utc();
      // }
      // return date.format(this.data.dateFormat);
      return grafana.getFormatedDate(value, this.data.dateFormat);
    }
    return value;
  }

  defaultValueFormatter(value: any) {
    if (value === null || value === void 0 || value === undefined) {
      return '';
    }

    if (_.isArray(value)) {
      value = value.join(', ');
    }

    if (this.data.sanitize) {
      return this.$sanitize(value);
    }
    return _.escape(value);
  }
  $sanitize(value: any) {
    throw new Error('Method not implemented.');
  }

  decimalPlaces(num) {
    const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(
      0,
      // Number of digits right of decimal point.
      (match[1] ? match[1].length : 0) -
        // Adjust for scientific notation.
        (match[2] ? +match[2] : 0)
    );
  }
}

export class GFMap {
  data: gf.TGFMapData;
  id: string;
  constructor(pattern, data: gf.TGFMapData) {
    this.data = data;
    this.data.pattern = pattern;
    this.id = GFP.utils.uniqueID();
    // this.import(data);
  }

  /**
   * Import data from panel
   *
   * @param {*} obj
   * @returns {this}
   * @memberof GFMap
   */
  import(obj: any): this {
    if (!!obj.pattern) {
      this.data.pattern = obj.pattern;
    }
    if (!!obj.hidden) {
      this.data.hidden = obj.hidden;
    }
    return this;
  }

  /**
   * Return if text match pattern
   *
   * @param {(string | null)} text
   * @returns {boolean}
   * @memberof GFMap
   */
  match(text: string | null): boolean {
    if (text === undefined || text === null || text.length === 0) {
      return false;
    }
    return GFP.utils.matchString(text, this.data.pattern);
  }

  /**
   * Return uniq ID
   *
   * @returns {string}
   * @memberof GFMap
   */
  getId(): string {
    return this.id;
  }

  /**
   * Show/enable
   *
   * @returns {this}
   * @memberof GFMap
   */
  show(): this {
    this.data.hidden = false;
    return this;
  }

  /**
   * Hide/disable
   *
   * @returns {this}
   * @memberof GFMap
   */
  hide(): this {
    this.data.hidden = true;
    return this;
  }

  /**
   * Return if hidden
   *
   * @returns {boolean}
   * @memberof GFMap
   */
  isHidden(): boolean {
    if (this.data.hidden === undefined) {
      return false;
    }
    return this.data.hidden;
  }

  /**
   * Toggle Visible/Hide
   *
   * @returns {boolean}
   * @memberof GFMap
   */
  toVisible(): boolean {
    if (this.data.hidden) {
      return false;
    }
    return true;
  }

  export(): gf.TGFMapData {
    return {
      pattern: this.data.pattern,
      hidden: this.data.hidden,
    };
  }
}

/**
 * ShapeMap class for mapping
 * @class ShapeMap
 * @extends GFMap
 */
class ShapeMap extends GFMap {
  data: gf.TShapeMapData;
  /**
   * Creates an instance of ShapeMap.
   * @param {string} pattern
   * @param {gf.TShapeMapData} data
   * @memberof ShapeMap
   */
  constructor(pattern: string, data: gf.TShapeMapData) {
    super(pattern, data);
    this.data = data;
  }

  /**
   * Return default data
   *
   * @static
   * @returns {gf.TShapeMapData}
   * @memberof ShapeMap
   */
  static getDefaultData(): gf.TShapeMapData {
    return {
      pattern: '',
      hidden: false,
      style: 'fillColor',
      colorOn: 'a',
    };
  }

  /**
   * Return true or false for condition to colorize
   *
   * @param {number} level
   * @returns {boolean}
   * @memberof ShapeMap
   * 0.7.0 : Moved to shape
   */
  toColorize(level: number): boolean {
    if (level === -1) {
      return false;
    }
    if (this.data.colorOn === 'n') {
      return false;
    }
    if (this.data.colorOn === 'a') {
      return true;
    }
    if (this.data.colorOn === 'wc' && level >= 1) {
      return true;
    }
    return false;
  }

  /**
   * Import data
   *
   * @param {*} obj
   * @returns {this}
   * @memberof ShapeMap
   */
  import(obj: any): this {
    super.import(obj);
    if (!!obj.style) {
      this.data.style = obj.style;
    }
    if (!!obj.colorOn) {
      this.data.colorOn = obj.colorOn;
    }
    return this;
  }
}

/**
 * TextMap class for mapping
 * @class TextMap
 * @extends GFMap
 */
class TextMap extends GFMap {
  data: gf.TTextMapData;
  constructor(pattern: string, data: gf.TTextMapData) {
    super(pattern, data);
    this.data = data;
  }

  /**
   * Return default data
   *
   * @static
   * @returns {gf.TTextMapData}
   * @memberof TextMap
   */
  static getDefaultData(): gf.TTextMapData {
    return {
      pattern: '',
      hidden: false,
      textReplace: 'content',
      textPattern: '/.*/',
      textOn: 'wmd',
    };
  }

  /**
   * Return true or false for condition to change label
   *
   * @param {number} level
   * @returns {boolean}
   * @memberof TextMap
   */
  toLabelize(level: number): boolean {
    // if (this.data.textOn === 'wmd' && level > 0) return true;
    // if (this.data.textOn === 'wmd' && level === -1) return false;
    if (this.data.textOn === 'wmd') {
      return true;
    }
    if (this.data.textOn === 'n') {
      return false;
    }
    if (this.data.textOn === 'wc' && level >= 1) {
      return true;
    }
    if (this.data.textOn === 'co' && level >= 2) {
      return true;
    }
    return false;
  }

  /**
   * Import data from current or old version
   *
   * @param {*} obj
   * @returns {this}
   * @memberof TextMap
   */
  import(obj: any): this {
    super.import(obj);
    if (!!obj.textReplace) {
      this.data.textReplace = obj.textReplace;
    }
    if (!!obj.textPattern) {
      this.data.textPattern = obj.textPattern;
    }
    if (!!obj.textOn) {
      this.data.textOn = obj.textOn;
    }

    return this;
  }

  /**
   * Replace text according text options
   *
   * @param {string} text
   * @param {string} FormattedValue
   * @returns
   * @memberof Rule
   */
  getReplaceText(text: string, FormattedValue: string): string {
    if (this.data.textReplace === 'content') {
      return FormattedValue;
    }
    if (this.data.textReplace === 'pattern') {
      const regexVal = GFP.utils.stringToJsRegex(this.data.textPattern);
      if (text.toString().match(regexVal)) {
        return text.toString().replace(regexVal, FormattedValue);
      }
      return text;
    }
    if (this.data.textReplace === 'as') {
      return `${text} ${FormattedValue}`;
    }
    if (this.data.textReplace === 'anl') {
      return `${text}\n${FormattedValue}`;
    }
    return text;
  }
}

/**
 * LinkMap class for mapping
 * @class LinkMap
 * @extends GFMap
 */
class LinkMap extends GFMap {
  data: gf.TlinkMapData;
  constructor(pattern: string, data: gf.TlinkMapData) {
    super(pattern, data);
    this.data = data;
  }

  static getDefaultData(): gf.TlinkMapData {
    return {
      pattern: '',
      hidden: false,
      linkUrl: '',
      linkParams: false,
      linkOn: 'a',
    };
  }

  /**
   * Get defined link
   *
   * @returns
   * @memberof Rule
   */
  getLink() {
    if (this.data.linkParams) {
      return this.data.linkUrl + window.location.search;
    }
    return this.data.linkUrl;
  }

  /**
   * Import data to Link
   *
   * @param {*} obj
   * @returns {this}
   * @memberof LinkMap
   */
  import(obj: any): this {
    super.import(obj);
    if (!!obj.linkUrl) {
      this.data.linkUrl = obj.linkUrl;
    }
    if (!!obj.linkParams) {
      this.data.linkParams = obj.linkParams;
    }
    if (!!obj.linkOn) {
      this.data.linkOn = obj.linkOn;
    }
    return this;
  }

  /**
   * Return true or false for condition to add/replace link
   *
   * @param {number} level
   * @returns {boolean}
   * @memberof LinkMap
   */
  toLinkable(level: number): boolean {
    if (this.data.linkOn === 'a') {
      return true;
    }
    if (this.data.linkOn === 'wc' && level >= 1) {
      return true;
    }
    return false;
  }
}

/**
 * TextMap class for Range Value
 * @class RangeMap
 */
class RangeMap {
  data: gf.TRangeMapData;
  constructor(from: string, to: string, text: string, data: gf.TRangeMapData) {
    this.data = data;
    this.data.from = from;
    this.data.to = to;
    this.data.text = text;
    this.data.hidden = false;
    // this.import(data);
  }

  /**
   * import data from panel
   *
   * @param {*} obj
   * @returns {this}
   * @memberof RangeMap
   */
  import(obj: any): this {
    this.data.from = !!obj.from ? obj.from : undefined;
    this.data.to = !!obj.to ? obj.to : undefined;
    this.data.text = !!obj.text ? obj.text : undefined;
    this.data.hidden = !!obj.hidden || obj.hidden === false ? obj.hidden : false;
    return this;
  }

  /**
   * Get default data
   *
   * @static
   * @returns {gf.TRangeMapData}
   * @memberof RangeMap
   */
  static getDefaultData(): gf.TRangeMapData {
    return {
      from: null,
      to: null,
      text: null,
      hidden: false,
    };
  }

  /**
   * Match value
   *
   * @param {*} value
   * @returns {boolean}
   * @memberof RangeMap
   */
  match(value: any): boolean {
    if (!!value || value.length > 0) {
      let v: number = Number(value);
      if (this.data.from !== null && this.data.from !== undefined && this.data.from.length > 0) {
        let from = Number(this.data.from);
        if (v >= from) {
          if (this.data.to !== null && this.data.to !== undefined && this.data.to.length > 0) {
            let to = Number(this.data.to);
            return v < to;
          }
          return true;
        }
        return false;
      }
      // from is empty here
      if (this.data.to !== null && this.data.to !== undefined && this.data.to.length > 0) {
        let to = Number(this.data.to);
        return v < to;
      }
      // from and to is empty
      return true;
    }
    return false;
  }

  /**
   * Return Formatted value
   *
   * @param {*} value
   * @returns {(string | null)}
   * @memberof RangeMap
   */
  getFormattedText(value: any): string | null {
    if (this.match(value)) {
      return this.data.text;
    }
    return value;
  }

  /**
   * Show/enable range
   *
   * @memberof RangeMap
   */
  show() {
    this.data.hidden = false;
  }

  /**
   * Hide/disable range
   *
   * @memberof RangeMap
   */
  hide() {
    this.data.hidden = true;
  }

  /**
   * Is hidden
   *
   * @returns
   * @memberof RangeMap
   */
  isHidden() {
    return this.data.hidden;
  }

  /**
   * is visible
   *
   * @returns
   * @memberof RangeMap
   */
  toVisible() {
    if (this.data.hidden) {
      return false;
    }
    return true;
  }

  /**
   * Export current data
   *
   * @returns
   * @memberof RangeMap
   */
  export() {
    return {
      from: this.data.from,
      to: this.data.to,
      text: this.data.text,
      hidden: this.data.hidden,
    };
  }
}

class ValueMap {
  data: gf.TValueMapData;
  constructor(value: string, text: string, data: gf.TValueMapData) {
    this.data = data;
    this.data.value = value;
    this.data.text = text;
    this.data.hidden = false;
    this.import(data);
  }

  /**
   * Get default data
   *
   * @static
   * @returns
   * @memberof ValueMap
   */
  static getDefaultdata() {
    return {
      value: '',
      text: '',
      hidden: false,
    };
  }

  /**
   * import data from panel
   *
   * @param {*} obj
   * @returns {this}
   * @memberof ValueMap
   */
  import(obj: any): this {
    this.data.value = obj.value || this.data.value || '';
    this.data.text = obj.text || this.data.text || '';
    this.data.hidden = obj.hidden || this.data.hidden || false;
    return this;
  }

  /**
   * Match value with datas
   *
   * @param {any} value
   * @returns {boolean}
   * @memberof ValueMap
   */
  match(value: any): boolean {
    if (value === null || value === undefined) {
      if (this.data.value === 'null') {
        return true;
      }
      return false;
    }

    if (!_.isString(value) && Number(this.data.value) === Number(value)) {
      return true;
    }
    return GFP.utils.matchString(value.toString(), this.data.value);
  }

  /**
   * Get formatted value
   *
   * @param {any} value
   * @returns
   * @memberof ValueMap
   */
  getFormattedText(value: any): string {
    if (value === null) {
      if (this.data.value === 'null') {
        return this.data.text;
      }
    }
    if (this.match(value)) {
      return this.data.text;
    }
    return `${value}`;
  }

  /**
   * Show/enable valuemap
   *
   * @memberof ValueMap
   */
  show() {
    this.data.hidden = false;
  }

  /**
   * Hide/disable valuemap
   *
   * @memberof ValueMap
   */
  hide() {
    this.data.hidden = true;
  }

  /**
   * Is hidden/disable
   *
   * @returns
   * @memberof ValueMap
   */
  isHidden() {
    return this.data.hidden;
  }

  /**
   * export data
   *
   * @returns
   * @memberof ValueMap
   */
  export() {
    return {
      value: this.data.value,
      text: this.data.text,
      hidden: this.data.hidden,
    };
  }
}
