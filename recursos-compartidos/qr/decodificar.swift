import Foundation
import Vision
import ImageIO

var failed = false
for path in CommandLine.arguments.dropFirst() {
    let request = VNDetectBarcodesRequest()
    request.symbologies = [.qr]
    do {
        try VNImageRequestHandler(url: URL(fileURLWithPath: path)).perform([request])
        let values = (request.results ?? []).compactMap { $0.payloadStringValue }
        if values.count != 1 { failed = true }
        let record: [String: Any] = ["archivo": path, "destinos": values]
        let data = try JSONSerialization.data(withJSONObject: record, options: [.sortedKeys])
        print(String(data: data, encoding: .utf8)!)
    } catch { failed = true; print("ERROR: \(error)") }
}
if failed { exit(1) }
