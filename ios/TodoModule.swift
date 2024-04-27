//
//  TodoService.swift
//  rn_bridges
//
//  Created by Максим Николаев on 18.04.2024.
//

import Foundation

@objc(TodoModule)
class TodoModule: RCTEventEmitter {
  
  // Пример с ивентом.
  @objc
  func fetch() -> Void {
    let urlString = "https://jsonplaceholder.typicode.com/todos"
    guard let url = URL(string: urlString) else {
      print("Invalid URL")
      return;
    }
    
    let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
      if let error = error {
        print("Error: \(error)");
      } else if let data = data {
        if let json = String(data: data, encoding: .utf8) {
          self.sendEvent(withName: "OnFetchSuccess", body: ["data": json])
        }
      }
    }
    
    task.resume()
  }
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc
  override func supportedEvents() -> [String]! {
    return ["OnFetchSuccess"]
  }
}
