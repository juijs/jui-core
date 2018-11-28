import jui from './base/base.js'
import DomUtil from './util/dom.js'
import SortUtil from './util/sort.js'
import KeyParserUtil from './util/keyparser.js'
import Base64Util from './util/base64.js'
import MathUtil from './util/math.js'
import TemplateUtil from './util/template.js'
import ColorUtil from './util/color.js'
import Manager from './base/manager.js'
import Collection from './base/collection.js'
import Core from './base/core.js'
import Event from './base/event.js'

jui.use([
    DomUtil, SortUtil, KeyParserUtil, Base64Util, MathUtil, TemplateUtil, ColorUtil,
    Manager, Collection, Core, Event
])

var _ = jui.include("util.base"),
    manager = jui.include("manager");

_.extend(jui, manager, true);

export default jui;