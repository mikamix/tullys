require "csv"
require "barby/barcode/ean_13"
require "barby/outputter/png_outputter"
require "digest"
require "fileutils"
require "parallel"

namespace :generate do
  def digest(index)
    Digest::SHA256.hexdigest("tullys#{index}")
  end

  def barcode(content)
    Barby::EAN13.new(content.chop).to_png(xdim: 20, height: 1000, margin: 100)
  end

  def html_path(n)
    "public/tullys/#{digest(n)}/index.html"
  end

  def barcode_path(n)
    "public/barcode/#{digest(n)}.png"
  end

  desc "URLを生成する"
  task :url, ["count"] => :environment do |_task, args|
    url_list = args[:count].to_i.times.map do |n|
      "https://cp-gift.com/tullys/#{digest(n)}/"
    end
    File.open("output/url_list.csv", "w") do |f|
      f.puts(url_list.join("\r\n"))
    end
  end

  desc "HTMLを生成する"
  task :html, ["csv"] => :environment do |_task, args|
    lines = IO.readlines(args[:csv], chomp: true)
    Parallel.each_with_index(lines, in_processes: 8) do |content, n|
      p "#{n}: #{digest(n)}"
      buffer = File.read("public/index.html")
        .gsub("XXXXXXXXXXXXX", content)
        .gsub("YYYYYYYYYYYYY", digest(n))
      FileUtils.mkdir_p(File::dirname(html_path(n)))
      File.write(html_path(n), buffer)
    end
  end

  desc "バーコードを生成する"
  task :barcode, ["csv"] => :environment do |_task, args|
    lines = IO.readlines(args[:csv], chomp: true)
    Parallel.each_with_index(lines, in_processes: 8) do |content, n|
      p "#{n}: #{digest(n)}"
      File.open(barcode_path(n), "wb") do |f|
        f.write(barcode(content))
      end
    end
  end
end
