require "csv"
require "barby/barcode/code_128"
require "barby/outputter/png_outputter"
require "digest"
require "fileutils"

namespace :generate do
  desc "URLを生成する"
  task :url, ["count"] => :environment do |_task, args|
    url_list = args[:count].to_i.times.map do |n|
      digest = Digest::SHA256.hexdigest("tullys#{n}")
      "https://cp-gift.com/tullys/#{digest}/"
    end
    File.open("output/url_list.csv", "w") do |f|
      f.puts(url_list.join("\r\n"))
    end
  end

  desc "バーコードを生成する"
  task :barcode, ["csv"] => :environment do |_task, args|
    IO.readlines(args[:csv], chomp: true).each_with_index do |content, n|
      barcode = Barby::Code128B.new(content)
      digest = Digest::SHA256.hexdigest("tullys#{n}")
      output = "output/barcode/#{digest}"

      Dir.mkdir(output) unless Dir.exist?(output)
      File.open("#{output}/barcode.png", "wb") do |f|
        f.write(barcode.to_png)
      end
    end
  end

  desc "HTMLとバーコードを生成する"
  task :html, ["csv"] => :environment do |_task, args|
    IO.readlines(args[:csv], chomp: true).each_with_index do |content, n|
      barcode = Barby::Code128B.new(content)
      digest = Digest::SHA256.hexdigest("tullys#{n}")
      output = "public/tullys/#{digest}"

      Dir.mkdir(output) unless Dir.exist?(output)
      FileUtils.cp("public/index.html", output)
      File.open("#{output}/barcode.png", "wb") do |f|
        f.write(barcode.to_png)
      end
    end
  end
end
