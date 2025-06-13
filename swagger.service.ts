import JsonRefs from "json-refs";
import YAML from "yaml";
import fs from "fs";

/**
 * 處理 YAML 檔案內容的處理器
 * @param {Object} res - 回應物件
 * @param {Function} callback - 回調函式
 */
function yamlContentProcessor(res: { text: string }, callback: (error: any, result?: any) => void) {
	try {
		callback(undefined, YAML.parse(res.text));
	} catch (error) {
		callback(error);
	}
}

/**
 * 處理 JSON 檔案內容的處理器
 * @param {Object} res - 回應物件
 * @param {Function} callback - 回調函式
 */
function jsonContentProcessor(res: { text: string }, callback: (error: any, result?: any) => void) {
	try {
		callback(undefined, JSON.parse(res.text));
	} catch (error) {
		callback(error);
	}
}

/**
 * 使用 JsonRefs 解析所有的 $ref 參照
 * @description
 * 由於 swagger-ui-express 本身無法處理外部參照，
 * 需要使用 JsonRefs 來自動解析並合併所有外部和內部的參照檔案。
 * 這個步驟會將所有分散在不同檔案的 API 定義合併成一個完整的文件。
 *
 * 參考資料：
 * - [Swagger UI Express 外部參照問題討論](https://github.com/scottie1984/swagger-ui-express/issues/364)
 * - [分割 Swagger 檔案相關討論](https://github.com/scottie1984/swagger-ui-express/issues/70)
 * - [如何分割 Swagger 檔案教學文章](https://azimi.me/2015/07/16/split-swagger-into-smaller-files.html)
 */

export async function loadSwaggerDocument(rootFilePath: string) {
	try {
		// 讀取檔案內容
		const fileContent = fs.readFileSync(rootFilePath, "utf8");

		// 根據檔案副檔名決定使用哪種解析器
		const isYaml =
			rootFilePath.toLowerCase().endsWith(".yaml") ||
			rootFilePath.toLowerCase().endsWith(".yml");

		// 初始解析檔案內容
		let rootOpenApiJSON;
		if (isYaml) {
			rootOpenApiJSON = YAML.parse(fileContent);
		} else {
			rootOpenApiJSON = JSON.parse(fileContent);
		}

		// 解析參照
		// 為什麼需要使用 JsonRefs 解析參照？可以參考 https://github.com/scottie1984/swagger-ui-express/issues/364相關的issue
		const swaggerDoc = await JsonRefs.resolveRefs(rootOpenApiJSON, {
			location: rootFilePath,
			loaderOptions: {
				processContent: isYaml ? yamlContentProcessor : jsonContentProcessor,
			},
		});

		return swaggerDoc.resolved;
	} catch (error) {
		console.error("解析 Swagger 文件時發生錯誤：", error);
		throw error;
	}
}