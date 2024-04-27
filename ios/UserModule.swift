//
//  UserModule.swift
//  rn_bridges
//
//  Created by Максим Николаев on 27.04.2024.
//

import Foundation

@objc(UserModule)
class UserModule : NSObject {
    
  // Пример с async/await на стороне react-native.
  @objc
  func getUser(_ id: NSNumber, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let urlString = "https://jsonplaceholder.typicode.com/users?id=\(id)"
    guard let url = URL(string: urlString) else {
      let error = NSError(domain: "Invalid URL", code: -1, userInfo: nil)
      reject("USER_FETCH_ERROR", error.domain, error)
      return
    };
    
    let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
      if let error = error {
        reject("USER_FETCH_ERROR", "", error)
        return
      }
      
      guard let data = data else {
        reject("USER_FETCH_ERROR", "Invalid data", error)
        return
      }
      
      if let json = String(data: data, encoding: .utf8) {
        resolve(json)
      }
    }
    
    task.resume()
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
