"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var inquirer_1 = __importDefault(require("inquirer"));
var path_1 = require("path");
var ora_1 = __importDefault(require("ora"));
var fs_1 = __importDefault(require("fs"));
var handlebars_1 = __importDefault(require("handlebars"));
// @ts-ignore
var nodegit_1 = require("nodegit");
// 比如我们想执行ds init **的命令，想出现“初始化组件模板”的描述
// action是执行这个命令后续的回调，...args是后面**的参数
commander_1.program
    .command('init')
    .description('初始化组件模板')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var answers, spinner, repository, error_1, fileName, content, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                    {
                        name: 'name',
                        message: '请输入项名称',
                    },
                    {
                        name: 'description',
                        message: '请输入项目描述',
                    },
                    {
                        name: 'author',
                        message: '请输入作者名称',
                    },
                ])];
            case 1:
                answers = _a.sent();
                spinner = ora_1.default('loading clone').start();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, nodegit_1.Clone.clone(
                    // TODO： egg https://github.com/RenHanbin/flame-egg.git
                    'https://gitee.com/qian-cheng-eric/flame.git', path_1.resolve("./" + answers.name))];
            case 3:
                repository = _a.sent();
                spinner.succeed();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                spinner.stop();
                console.error('项目克隆失败，可能是网络原因', error_1);
                return [3 /*break*/, 5];
            case 5:
                fileName = answers.name + "/package.json";
                // 判断一下是否有这个文件
                if (fs_1.default.existsSync(fileName)) {
                    content = fs_1.default.readFileSync(fileName).toString();
                    result = handlebars_1.default.compile(content)(answers);
                    fs_1.default.writeFileSync(fileName, result);
                }
                return [2 /*return*/];
        }
    });
}); });
// 解析命令行
commander_1.program.parse(process.argv);
