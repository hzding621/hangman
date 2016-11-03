#!/usr/bin/env ruby

puts 'Inserting words'

File.open('db/google-10000-english-usa-no-swears-long.txt').each_line do |line|
  Word.create!(:value => line.chomp)
end

puts 'done'